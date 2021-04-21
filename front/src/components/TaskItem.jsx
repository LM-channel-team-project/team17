import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import CheckButton from './CheckButton';
import IconButton from './IconButton';
import PriorityIcon from './PriorityIcon';
import styles from '../styles/TaskItem.module.css';
import timeparser from '../utils/timestamp-parser';

/** Created by 오영롱(youngrongoh) on 2021/04/20
 * 전단받은 사용자의 태스크 정보를 투두 형식으로 보여주는 아이템
 * @param {Object} props.task -
 * @param {'basic' | 'daily'} props.type - 태스크 아이템에서 기간(period)에 대한 표시 여부를 결정하는 문자열
 */
const TaskItem = ({ task, type }) => {
  const { level, checked, content, periods } = task;
  const isPeriodsRender = periods && type === 'daily';

  const onCheckClick = () => {};
  const onDeleteClick = () => {};

  return (
    <li className={styles.task}>
      <div className={styles.checkzone}>
        <PriorityIcon level={level} />
        <CheckButton checked={checked} onClick={onCheckClick} />
        <span>{content}</span>
      </div>
      {isPeriodsRender && <span>{timeparser.parsePeriods(periods)}</span>}
      <IconButton Icon={AiFillDelete} onClick={onDeleteClick} />
    </li>
  );
};

export default TaskItem;