import React from 'react'
import styled from 'styled-components'
import { SkeletonPlaceholder, Tile } from 'carbon-components-react';
import { BookingModal } from './BookingModal';

const Container = styled(Tile)`
    height: 80px;
    padding: 0;
    margin-bottom: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    &:last-of-type {
        margin: 0;
    }

    img {
        width: 120px;
        size: cover;
        object-fit: cover;
        user-select: none;
    }

    /* Fix impossible style override of modal element */
    .bx--btn {
        height: 100%;

        .bx--btn__icon { 
            height: 1.5rem;
            width: 1.5rem;
        }
    }
`;

const InfoPart = styled.div`
    flex: 1;
    padding: 8px 8px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    white-space: nowrap;
    overflow: hidden;

    p, h4 {
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        overflow: hidden
    }
`;

export const VehicleItemSkeleton = styled(SkeletonPlaceholder)`
    height: 80px;
    padding: 0;
    margin-bottom: 8px;
    width: 100%;
`;

export type VehilceItemProps = {
    id: number | string;
    name: string;
    description?: string;
    image?: string;
}

export function VehicleItem({ id, name, description, image }: VehilceItemProps) {
    return (
        <Container >
            <img alt="Vehicle" src={image} />
            <InfoPart>
                <h4>{name}</h4>
                <p className="bx--tooltip__label">{description}</p>
            </InfoPart>
            <BookingModal id={id} />
        </Container >
    )
}

