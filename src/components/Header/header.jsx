import style from './Header.module.scss'

function Header() {
  return (
    <header className={style.header}>
      <h1>todos</h1>
      <p>Organize your tasks efficiently</p>
    </header>
  );
}

export default Header;
