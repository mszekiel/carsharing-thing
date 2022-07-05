import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { InlineLoading, Tile } from 'carbon-components-react';
import { useTranslation } from 'react-i18next'

import { VehicleItem, VehicleItemSkeleton } from './VehicleItem';
import { selectVehicles, selectVehiclesInProgress } from '../../../redux/vehicles/vehicles.selectors';

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 30px;
    display: flex;
    overflow: hidden;
    pointer-events: all;

    & ::-webkit-scrollbar {
        width: 4px;
    }

    & ::-webkit-scrollbar-track {
        background: #393939;
    }

    & ::-webkit-scrollbar-thumb {
        background: white;
    }
`;

const Content = styled.div`
    height: 100%;
    padding: 15px;
    width: 50%;
    max-width: 600px;
    display: flex;
    flex-direction: column;

    h1 { 
        margin-bottom: 4px;
    }
`;

const Scroller = styled.div`
    height: 100%;
    overflow: auto;
    padding-right: 4px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TileText = styled(Tile)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12pt;
    user-select: none;
`;

const Title = styled.div`
    display: flex;
    width: 100%;
    align-items: center;

    div {
        margin-top: 1px;
    }

    h1 {
        white-space: nowrap;
        margin-right: 20px;
    }
`;

export function List() {
    const vehicles = useSelector(selectVehicles)
    const inProgress = useSelector(selectVehiclesInProgress);
    const { t } = useTranslation();

    const getContent = () => {
        if (inProgress) {
            return new Array(3).fill('').map((_, id) => <VehicleItemSkeleton key={id} />)
        } else {
            return vehicles.map(veh => <VehicleItem key={veh.id} id={veh.id} name={veh.name} description={veh.shortDescription} image={veh.image} />)
        }
    }

    return (
        <Container>
            <Content>
                <Title><h1>{t('vehicles.list.available.title')}</h1>{inProgress ? <div><InlineLoading /></div> : null}</Title>
                <Scroller>
                    {getContent()}
                </Scroller>
            </Content>
            <InfoContainer>
                <TileText>{t('main.map.error')}</TileText>
            </InfoContainer>
        </Container>
    )
}