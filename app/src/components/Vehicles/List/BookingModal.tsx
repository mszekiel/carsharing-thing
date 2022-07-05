import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ArrowRight32 } from '@carbon/icons-react'
import { Button, Column, InlineLoading, Modal } from 'carbon-components-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectVehicleById } from '../../../redux/vehicles/vehicles.selectors'
import { useTranslation } from 'react-i18next'
import { fetchDetails } from '../../../redux/vehicles/vehicles.slice'
import styled from 'styled-components'
import { useHistory } from 'react-router'

const Content = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden; 
`

const Row = styled.div`
    display: flex;
    overflow: hidden;

    img {
        margin-bottom: 16px;
        margin-right: 16px;
    }

    @media(max-width: 630px) {
        flex-direction: column;
    }
`;

export type BookingModalProps = {
    id: number | string;
}

export function BookingModal({ id }: BookingModalProps) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { push } = useHistory();
    const vehicle = useSelector(selectVehicleById(id))!;

    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (!vehicle.description && open) {
            dispatch(fetchDetails(vehicle.id))
        }
    }, [vehicle, dispatch, open])

    const renderModal = () => ReactDOM.createPortal(
        <Modal
            onChange={console.log}
            open={open}
            onRequestClose={() => setOpen(false)}
            onRequestSubmit={() => push(`/book/${id}`)}
            modalLabel={t('vehicles.list.rent.title')}
            modalHeading={vehicle.name}
            primaryButtonText={t('vehicles.list.rent.buttons.primary')}
            size='lg'
        >
            <Content>
                <Column>
                    <Row>
                        <img width="300px" height="200px" alt="car" src={vehicle.image} />
                        <div>
                            {vehicle.description ? vehicle.description : <>{vehicle.shortDescription} <InlineLoading /></>}
                        </div>
                    </Row>
                </Column>
            </Content>
        </Modal>,
        document.body
    )


    return (
        <>
            <Button renderIcon={ArrowRight32} onClick={() => setOpen(true)} iconDescription={t('vehicles.list.rent.title')} />
            {open ? renderModal() : null}
        </>
    )
}