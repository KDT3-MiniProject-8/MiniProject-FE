import React, { useEffect, useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { requestDelWishList } from '../../api/wishApi';

type Props = { item: DataType; setToggled: any; toggled:boolean };

function WishCard({ item, setToggled, toggled }: Props) {
  const [likeState, setLikeState] = useState<boolean>(true); // 추후에 toolkit으로 상태관리 예정

  function wishButton () {
    requestDelWishList(Number(item.itemId), setLikeState);
  }
  useEffect(()=>{
    setToggled(!toggled)
  },[likeState])

  return (
    <Wrap>
      <LinkWrap to={`/detail/${item.itemId}`}>
        <Item bankName={item.bank}>
          <div>
            <h4>{item.bank}</h4>
          </div>
          <h3>{item.itemName}</h3>
          <span>
            {item.category} - {item.type}
          </span>
        </Item>
      </LinkWrap>
      <Button
        onClick={() => {
          wishButton();
        }}
      >
        {likeState ? <HiHeart /> : <HiOutlineHeart />}
      </Button>
    </Wrap>
  );
}
const Wrap = styled.div`
  position: relative;
`;
const LinkWrap = styled(Link)`
  width: 100%;
`;
const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;
const Item = styled.div<{ bankName: string }>`
  padding: 30px;
  height: 100px;
  border-radius: 15px;
  display: flex;
  flex-flow: column;
  color: rgba(0, 0, 0, 0.7);
  margin: 20px auto;
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

export type DataType = {
  itemId: string;
  category: string;
  bank: string;
  itemName: string;
  type: string;
  join: string;
  limit: string;
  preference: any;
  target: any;
  rate: string;
  prefRate: string;
  mature: string;
};

export default WishCard;