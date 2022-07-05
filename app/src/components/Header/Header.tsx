import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components';
import { Column, OverflowMenu, OverflowMenuItem, Row, Search } from 'carbon-components-react';
import { useHistory } from 'react-router';

const FlexRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
`

export function Header() {
    const { push } = useHistory();
    const { t, i18n } = useTranslation();

    return (
        <Row>
            <Column >
                <FlexRow>
                    <Search disabled labelText="Search" placeholder="Actually, you will find nothing here..." />
                    <OverflowMenu flipped direction="bottom" style={{ backgroundColor: '#393939' }} size='xl' >
                        <OverflowMenuItem itemText={`${t('main.nav.map')}`} onClick={() => push('/')} />
                        <OverflowMenuItem itemText={`${t('main.nav.account')}`} disabled />
                        <OverflowMenuItem itemText={`${t('main.nav.history')}`} onClick={() => push('/history')} />
                        <OverflowMenuItem itemText={`${t('main.nav.fleet')}`} disabled />
                        <OverflowMenuItem itemText={`${t('main.nav.settings')}`} disabled />
                        <OverflowMenuItem itemText={`${t('main.lang.de')}`} value='de' hasDivider onClick={() => i18n.changeLanguage('de')} />
                        <OverflowMenuItem itemText={`${t('main.lang.en')}`} value='en' onClick={() => i18n.changeLanguage('en')} />
                    </OverflowMenu>
                </FlexRow>
            </Column>
        </Row>
    )
}