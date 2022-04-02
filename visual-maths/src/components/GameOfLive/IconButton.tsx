function IconButton(props: any) {
  return (
    <button
      className={`bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-full mr-2 ${props.classes}`}
      onClick={props.handler}
    >
      <i className={props.icon}></i>
    </button>
  );
}

export default IconButton;
