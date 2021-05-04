import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import Button from './Button';
import IconButton from './IconButton';
import Input from './Input';
import styles from '../styles/QuickAddForm.module.css';

/**
 * Task 내용만 입력하여 Task를 빠르게 추가하는 폼 컴포넌트
 * @param {Fucntion} toggleTaskFormModal - 전역 모달 상태를 변경하여 태스크 폼을 토글하는 함수
 */

const QuickAddForm = ({ toggleTaskFormModal, addTask }) => {
  const formRef = useRef();
  const inputRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(formRef.current);

    const task = Array.from(form.keys()).reduce((obj, key) => {
      const copied = { ...obj };
      copied[key] = form.get(key);
      return copied;
    }, {});

    addTask(task);

    inputRef.current.value = '';
  };

  const onDetailClick = () => {
    const form = new FormData(formRef.current);
    const content = form.get('content');
    toggleTaskFormModal(content);
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
      <IconButton Icon={FaPlus} styleName="QuickAddForm__icon" onClick={onDetailClick} />
      <Input
        inputRef={inputRef}
        name="content"
        styleName="QuickAddForm"
        placeholder="나의 할 일 작성하기"
      />
      <Button styleName="QuickAddForm" type="submit">
        등록
      </Button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTaskFormModal: (content) => dispatch(actionCreators.toggleTaskFormModal(content)),
    addTask: (task) => dispatch(actionCreators.addTask(task)),
  };
};

export default connect(undefined, mapDispatchToProps)(QuickAddForm);
