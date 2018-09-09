import React from 'react';
import styled from 'styled-components';
import spinner from '../image/spinner.gif';
import pair from '../image/pair.svg';
import warning from '../image/warning.svg';

export const Spinner = styled.span`
    display: inline-block;
    width: ${props => props.width || '80px'};
    height: ${props => props.height || '80px'};
    background: url(${spinner}) no-repeat;
    background-size: cover;
`;

export const Pair = styled.span`
    display: inline-block;
    width: ${props => props.width || '20px'};
    height: ${props => props.height || '20px'};
    background: url(${pair}) no-repeat;
    background-size: cover;
`;

export const TitleBlk = styled.div`
    margin: 10px 0;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 30px;
    color: #009688;
    font-weight: bold;
`;


const WarningText = styled.div `
    text-align: center;
    font-size: 20px;
    padding: 5px 10px;
`;

export const WarningIco = styled.span`
    display: inline-block;
    width: ${props => props.width || '20px'};
    height: ${props => props.height || '20px'};
    background: url(${warning}) no-repeat;
    background-size: cover;
    margin-right: 10px;
`;

export function WaringBlk (props = {}) {
    return (
        <WarningText>
            <WarningIco/>
            {props.content || '服務出了點問題，請稍後再試!'}
        </WarningText>
    )
}