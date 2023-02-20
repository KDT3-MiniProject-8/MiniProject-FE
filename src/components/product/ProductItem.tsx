import react from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type productItem = {
  item: {
    itemId: string;
    category: string;
    bank: string;
    itemName: string;
    type: string;
    dtype: string;
    rate: string;
    prefRate: string;
  };
  key: number;
};

const ProductItem = ({ item }: productItem) => {
  const bankName: string = item.bank;

  return (
    <Link to={`detail/${item.itemId}`}>
      <Item bankName={bankName}>
        <div>
          <h4>{item.bank}</h4>
          <p>금리 {item.prefRate}%</p>
        </div>
        <h3>{item.itemName}</h3>
        <span>{item.category}</span>
      </Item>
    </Link>
  );
};

const Item = styled.div<{ bankName: string }>`
  padding: 30px;
  height: 125px;
  border-radius: 15px;
  display: flex;
  flex-flow: column;
  color: rgba(0, 0, 0, 0.7);
  background-color: ${(props) =>
    props.bankName === '국민은행'
      ? 'var(--color-bank-yellow)'
      : props.bankName === '신한은행'
      ? 'var(--color-bank-blue)'
      : props.bankName === '하나은행'
      ? 'var(--color-bank-green)'
      : props.bankName === '우리은행'
      ? 'var(--color-bank-puple)'
      : 'var(--color-bg-grey)'};
  div {
    display: flex;
    align-items: center;
    h4 {
      font-size: 18px;
      margin: 0 auto 0 0;
    }
    p {
      font-size: 12px;
      font-weight: bold;
      background-color: white;
      padding: 5px 10px;
      border-radius: 30px;
      color: var(--color-black);
    }
  }
  h3 {
    margin: 13px 0 0;
    font-size: 20px;
    line-height: 1.2em;
    font-weight: bold;
  }
  span {
    font-weight: bold;
    margin-top: auto;
  }
`;

export default ProductItem;
