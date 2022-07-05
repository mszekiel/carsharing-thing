import React from 'react'
import styled from 'styled-components'
import { SkeletonPlaceholder } from 'carbon-components-react'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column-reverse;
`;

const Slider = styled.div`
    display: flex;
    padding: 15px;
    overflow: auto;
    pointer-events: all;
`

const Placeholder = styled(SkeletonPlaceholder)`
    flex: 0 0 auto;
    height: 225px;
    width: 160px;
    margin: 4px 8px 0 0;
`;

export const Cards = () => {
    // const vehicles = useSelector(selectVehicles)

    return (
        <Container>
            <Slider>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
            </Slider>
        </Container>
    )
}