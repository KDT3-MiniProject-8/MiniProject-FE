import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AlertModal from '../../utils/AlertModal';

type PropsType = {
  item: {
    category: string;
    itemId: string;
    bank: string;
    itemName: string;
    type: string;
    purchaseId: number;
    purchase_date: string;
    status: string;
  };
  removeButton: (purchaseId: number, itemName: string) => void;
  canceled: boolean;
};

function PurchaseCard({ item, removeButton, canceled }: PropsType) {
  const navigate = useNavigate();
  let logo = '';

  switch (item.bank) {
    case '부산은행':
      logo = 'bank-bs.png';
      break;
    case '한국씨티은행':
      logo = 'bank-ct.png';
      break;
    case '대구은행':
      logo = 'bank-dg.png';
      break;
    case '광주은행':
      logo = 'bank-gj.png';
      break;
    case '하나은행':
      logo = 'bank-hn.png';
      break;
    case '중소기업은행':
      logo = 'bank-ibk.png';
      break;
    case '국민은행':
      logo = 'bank-kb.png';
      break;
    case '농협은행':
      logo = 'bank-nh.png';
      break;
    case '한국스탠다드차타드은행':
      logo = 'bank-sc.png';
      break;
    case '신한은행':
      logo = 'bank-sh.png';
      break;
    case '수협은행':
      logo = 'bank-suh.png';
      break;
    case '우리은행':
      logo = 'bank-wr.png';
      break;
  }

  return (
    <Wrap>
      <LinkWrap
        onClick={() =>
          navigate(`/detail/${item.category.includes('대출') ? 'loan' : 'deposit'}/${item.itemId}`)
        }
      >
        <Item bankName={item.bank}>
          <div>
            <h4>{item.bank}</h4>
          </div>
          <h3>{item.itemName}</h3>
          <span>
            {item.category} - {item.type}
          </span>
          <div className="date">
            {item.status.includes('신청취소') ? '취소' : '신청'}일시 :{' '}
            {item.purchase_date.replace('T', ' / ')}
          </div>
          <div className="logo">
            <img src={`/${logo}`} style={{ width: '50px' }} />
          </div>
        </Item>
      </LinkWrap>

      {canceled ? null : (
        <Button
          onClick={() => {
            AlertModal({
              message: `${item.itemName} 상품의 신청을 취소하시겠습니까?`,
              action: () => {
                removeButton(Number(item.purchaseId), item.itemName);
              },
              type: 'confirm',
            });
          }}
        >
          신청취소
        </Button>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  cursor: pointer;
`;
const LinkWrap = styled.div`
  width: 100%;
`;
const Button = styled.button`
  position: absolute;
  top: 60%;
  right: 20px;
  background-color: var(--color-dark-grey);

  :hover {
    background-color: var(--color-orange);
  }
`;
const Item = styled.div<{ bankName: string }>`
  padding: 30px;
  padding-right: 50px;
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
      ? 'var(--color-bank-sky)'
      : props.bankName === '하나은행'
      ? 'var(--color-bank-green)'
      : props.bankName === '우리은행'
      ? 'var(--color-bank-puple)'
      : props.bankName === '한국스탠다드차타드은행'
      ? 'var(--color-bank-lightgreen)'
      : props.bankName === '농협은행'
      ? 'var(--color-bank-blue)'
      : props.bankName === '한국씨티은행'
      ? 'var(--color-bank-teal)'
      : props.bankName === '중소기업은행'
      ? 'var(--color-bank-orange)'
      : 'var(--color-bg-grey)'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
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
    padding-right: 20px;
  }
  span {
    font-weight: bold;
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: white;
    padding: 5px 10px;
    border-radius: 30px;
  }
  .logo {
    position: absolute;
    right: 30px;
    bottom: 20px;
  }
  .date {
    position: absolute;
    bottom: 20px;
    color: white;
    text-shadow: 1px 1px 1px var(--color-dark-grey);
  }
`;

export default PurchaseCard;
