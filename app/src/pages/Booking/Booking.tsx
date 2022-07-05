import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { batch, useDispatch, useSelector } from 'react-redux';
import { Add32, Subtract32 } from '@carbon/icons-react';
import { Button, DatePicker, DatePickerInput, TextInput, Toggle } from 'carbon-components-react';
import { Redirect, useHistory, useParams } from 'react-router';

import { selectVehicleById } from '../../redux/vehicles/vehicles.selectors';
import { setStart, setEnd, setVehicle, makeBooking } from '../../redux/booking/booking.slice';
import { selectData } from '../../redux/booking/booking.selectors';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 16px 30px;
    flex-direction: column;
    pointer-events: all;
    flex: 1;

    @media(max-width: 630px){
        padding: 16px 15px;  
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    padding-top: 8px;
    flex-direction: column;
    flex: 1;
`;

const Row = styled.div`
    display: flex;
    margin: 8px 0;

    @media(max-width: 750px){
        margin: 8px 0;
        flex-direction: column;
    }

    img {
        padding: 0 8px 0 0;

        @media(max-width: 630px){
            padding: 0 0 8px 0;
        }
    }
`;

const Knobs = styled.div`
    margin-top: 16px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    
    & > .bx--form-item:first-of-type {
        flex: 1;

        @media(max-width: 750px){
            padding-bottom: 16px;
        }
    }

    & > .bx--form-item:not(:first-of-type) {
        flex: 2;
    }

    @media(max-width: 750px){
        flex-direction: column;
    }
`;

const KnobsCounter = styled.div`
    display: flex;
    margin: 0 16px;
    flex-direction: column;
`;

export function Booking() {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const { push } = useHistory();
    const dispatch = useDispatch();
    const vehicle = useSelector(selectVehicleById(id))
    const data = useSelector(selectData);
    const [daysOnly, setDaysOnly] = useState(true);
    // Initial days should be based on start - end 
    const [days, setDays] = useState(1);

    const submitDisabled = !(data.vehicle && data.start && data.end);

    useEffect(() => {
        dispatch(setVehicle(id))
        return () => { dispatch(setVehicle(-1)) }
    }, []);

    useEffect(() => {
        if (daysOnly && data.start instanceof Date) {
            const endDate = new Date(new Date().setDate(data.start.getDate() + days));
            if (!isNaN(endDate.getTime())) {
                dispatch(setEnd(endDate))
            }
        }
    }, [daysOnly, days])

    const handleSetDays = (val: number) => {
        if (val <= 1) {
            setDays(1)
        } else {
            setDays(val)
        }
    }

    const handleDateChange = (dates: Date[]) => {
        if (dates[1]) {
            batch(() => {
                dispatch(setStart(dates[0]))
                dispatch(setEnd(dates[1]))
            })
        } else {
            batch(() => {
                dispatch(setStart(dates[0]))
                dispatch(setEnd(new Date(dates[0].getDate() + days)))
            })
        }
    }

    const handleSubmit = () => {
        dispatch(makeBooking(data));
    }

    const DoublePicker = () => (
        <DatePicker dateFormat="d/m/y" datePickerType='range' onChange={handleDateChange} value={[data.start || '', data.end || '']}>
            <DatePickerInput
                id="date-picker-input-id-start"
                placeholder="dd/mm/yyy"
                labelText={t("vehicles.booking.details.date.start") || ''}
            />
            <DatePickerInput
                id="date-picker-input-id-finish"
                placeholder="dd/mm/yyy"
                labelText={t("vehicles.booking.details.date.end") || ''}
            />
        </DatePicker >
    )

    const SinglePicker = () => (
        <div className="bx--date-picker">
            <DatePicker datePickerType="single" onChange={handleDateChange} value={data.start || ''} >
                <DatePickerInput
                    id="date-picker-input-id-start-single"
                    placeholder="dd/mm/yyy"
                    labelText={t("vehicles.booking.details.date.start") || ''}
                />
            </DatePicker>
            <KnobsCounter>
                <label className="bx--label">{t("vehicles.booking.details.date.duration")}</label>
                <div style={{ display: 'flex' }}>
                    <Button size="field" hasIconOnly renderIcon={Subtract32} iconDescription="Minus" onClick={() => handleSetDays(days - 1)} />
                    <TextInput id="asd" labelText="" value={days} />
                    <Button size="field" hasIconOnly renderIcon={Add32} iconDescription="Plus" onClick={() => handleSetDays(days + 1)} />
                </div>
            </KnobsCounter>
        </div>
    )


    if (!vehicle) {
        return <Redirect to='/' />
    }

    return (
        <Container>
            <Header>
                <Button onClick={() => push('/')}>{t("main.nav.util.back")}</Button>
                <h3 style={{ padding: '0 16px' }}>{vehicle.name}</h3>
            </Header>
            <Content>
                <Row>
                    <img height="250px" src={`/${vehicle.image}`} alt={vehicle.name} />
                    <p>
                        {vehicle.description}
                    </p>
                </Row>

                <h4 style={{ marginRight: '16px' }}>{t("vehicles.booking.details.header")}</h4>

                <Knobs>
                    <Toggle toggled={!daysOnly} id='toggle-date-type' labelText={t("vehicles.booking.details.with_end_date")} onToggle={(toggled) => setDaysOnly(!daysOnly)} />
                    {daysOnly ? <SinglePicker /> : <DoublePicker />}
                </Knobs>

                <Row>
                    <Button disabled={submitDisabled} onClick={handleSubmit} style={{ margin: '16px 0' }}>{t("vehicles.booking.cta")}</Button>
                </Row>
            </Content>
        </Container >
    )
}