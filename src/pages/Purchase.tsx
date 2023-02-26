import React, { useState, useEffect } from 'react';
import { getDepositPurchase, getLoanPurchase, removePurchase } from '../api/api';
import { getWishCount } from '../api/wishApi';
import PurchaseCard from '../components/user/PurchaseCard';
import styled from 'styled-components';
import { Button, FlexBox } from './Wish';

function Purchase() {
  const [depositData, setDepositData] = useState([]);
  const [loanData, setLoanData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [count, setCount] = useState([]);
  const [toggleButton, setToggleButton] = useState<boolean>(true);

  const getList = async () => {
    try {
      const depositList = await getDepositPurchase();
      const loanList = await getLoanPurchase();
      const countOnPurchase = await getWishCount();
      setCount(countOnPurchase.data.resultData);
      setDepositData(depositList.data.resultData);
      setLoanData(loanList.data.resultData);
    } catch (err) {
      console.log(err);
    }
  };

  const removeButton = (itemId: number, itemName: string) => {
    try {
      removePurchase(Number(itemId));
      alert(`${itemName} 상품 신청이 취소되었습니다.`);
      getList();
    } catch (err) {
      alert('에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    console.log(depositData, loanData);
    setAllData([...depositData, ...loanData]);
  }, [depositData, loanData]);

  const ButtonToggle = () => {
    setToggleButton(!toggleButton);
  };

  return (
    <main>
      <Wrap>
        <h1>가입상품</h1>
        <p>가입(신청)중인 {count}개의 상품이 있습니다.</p>
        <div>
          <FlexBox>
            <Button onClick={ButtonToggle} toggleButton={toggleButton}>
              가입중인 상품
            </Button>
            <Button onClick={ButtonToggle} toggleButton={!toggleButton}>
              신청 취소 내역
            </Button>
          </FlexBox>
          {toggleButton ? (
            allData?.length ? (
              allData?.map((item: any) => {
                return item.status === '신청완료' ? (
                  <div key={item.purchaseId}>
                    <PurchaseCard
                      item={item}
                      key={item.purchaseId}
                      removeButton={removeButton}
                      canceled={false}
                    />
                  </div>
                ) : null;
              })
            ) : (
              <p>가입중인 상품이 없습니다.</p>
            )
          ) : allData?.length ? (
            allData?.map((item: any) => {
              return item.status === '신청취소' ? (
                <div key={item.purchaseId}>
                  <PurchaseCard
                    item={item}
                    key={item.purchaseId}
                    removeButton={removeButton}
                    canceled={true}
                  />
                </div>
              ) : null;
            })
          ) : (
            <p>취소한 상품이 없습니다.</p>
          )}
        </div>
      </Wrap>
    </main>
  );
}
const Wrap = styled.div`
  padding: 20px 35px 60px;
  margin-top: 20px;

  p {
    margin: 30px 0 30px;
    text-align: right;
    color: var(--color-orange);
    font-size: 16px;
  }
`;
export default Purchase;
