import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import { selectBookings } from '../../redux/booking/booking.selectors';

import { getAllBookings } from '../../redux/booking/booking.slice';

const Container = styled.div`
    display: flex;
    flex: 1;
    padding: 16px;
`;

export function History() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const bookings = useSelector(selectBookings);

    useEffect(() => {
        dispatch(getAllBookings())
    }, [])

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>ID</TableHeader>
                        <TableHeader>{t("history.table.start")}</TableHeader>
                        <TableHeader>{t("history.table.stop")}</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map(row => (
                        <TableRow>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.start}</TableCell>
                            <TableCell>{row.end}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}