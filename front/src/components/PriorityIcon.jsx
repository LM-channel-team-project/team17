import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import BrightStarIcon from './BrightStarIcon';
import styles from '../styles/PriorityIcon.module.css';

/** Created by 오영롱(youngrongoh) on 2021/04/20
 * 전달받은 중요도 수준(level)에 따라 적절한 아이콘을 표시하는 아이콘 컴포넌트
 * @param {1 | 2 | 3} props.level - 세 가지 단계의 중요도 수준을 나타내는 문자열
 */
const PriorityIcon = ({ level: _level }) => {
  const level = Number(_level);

  return (
    <div className={styles.icon}>
      {level <= 1 && <AiOutlineStar className={`${styles.star} ${level === 0 && styles.hidden}`} />}
      {level === 2 && <AiFillStar className={styles.star} />}
      {level === 3 && <BrightStarIcon className={styles.star} />}
    </div>
  );
};

export default PriorityIcon;