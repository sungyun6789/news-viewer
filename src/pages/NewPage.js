import React from 'react';
import NewList from '../component/NewsList';
import Categories from '../component/Categories';

const NewsPage = ({ match }) => {
    // 카테고리가 선택되지 않았으면 기본값 aill로 사용
    const category = match.params.category || 'all';

    return (
        <>
            <Categories />
            <NewList category={category} />
        </>
    );
};

export default NewsPage;