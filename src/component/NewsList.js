import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=8279395ff1e24100a4893a34bf297bce`
        );
    }, [category]);

    // 대기 중일 때
    if (loading) {
        return <NewListBlock>대기 중...</NewListBlock>
    }
    // 아직 articles 값이 설정되지 않았을 때
    if (!response) {
        return null;
    }

    // 에러가 발생했을 때
    if (error) {
        return <NewListBlock>에러 발생!</NewListBlock>;
    }

    // response 값이 유효할 때
    const { articles } = response.data;
    return (
        <NewListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewListBlock>
    );
};

export default NewList;