import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { fetchAll } from '../../redux/vehicles/vehicles.slice';
import { Cards } from './Cards/Cards';
import { List } from './List/List';

export function Vehicles() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAll());
    }, [dispatch])

    const renderContent = () => {
        if (isMobile) {
            return <Cards />
        }

        return <List />
    }

    return renderContent()
}