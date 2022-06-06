import style from './button.module.css';

function button(props) {
  if (props.link && props.id) {
    return (
      <a href={props.link + props.id} className={style.btn}>
        {props.text}
      </a>
    );
  } else if (props.link && !props.id) {
    return (
      <a href={props.link} className={style.btn}>
        {props.text}
      </a>
    );
  } else {
    if (props.type === 'delete') {
      return (
        <button className={style.delete} onClick={props.handler}>
          {props.text}
        </button>
      );
    } else {
      return (
        <button className={style.btn} onClick={props.handler}>
          {props.text}
        </button>
      );
    }
  }
}

export default button;
