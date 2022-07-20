import style from './button.module.css';

function Button(props) {
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
        <button
          className={style.delete}
          onClick={props.handler}
          type={props.type}
          onKeyPress={props.handleKeypress}
        >
          {props.text}
        </button>
      );
    } else {
      return (
        <button
          className={style.btn}
          onClick={props.handler}
          type={props.type}
          onKeyPress={props.handleKeypress}
        >
          {props.text}
        </button>
      );
    }
  }
}

export default Button;
