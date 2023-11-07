
const UserIcon  = ({ color, width, height }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 666 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M99.7886 150C99.7886 67.1573 166.946 0 249.789 0C332.632 0 399.789 67.1573 399.789 150C399.789 232.843 332.632 300 249.789 300C166.946 300 99.7886 232.843 99.7886 150Z" fill="white"/>
      <path d="M412.038 235.44C410.522 238.313 411.165 241.897 413.775 243.83C433.162 258.18 457.152 266.667 483.122 266.667C547.555 266.667 599.788 214.433 599.788 150C599.788 85.5667 547.555 33.3334 483.122 33.3334C457.152 33.3334 433.162 41.82 413.775 56.171C411.165 58.1044 410.522 61.686 412.038 64.5597C425.502 90.073 433.122 119.147 433.122 150C433.122 180.853 425.502 209.927 412.038 235.44Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M87.8268 356.643C128.905 338.813 182.803 333.333 249.787 333.333C316.828 333.333 370.765 338.823 411.858 356.693C456.622 376.157 483.828 409.31 498.088 456.12C504.772 478.06 488.292 500 465.582 500H34.0554C11.3181 500 -5.19657 478.027 1.50743 456.047C15.7864 409.23 43.0344 376.087 87.8268 356.643Z" fill={color}/>
      <path d="M427.072 301.213C413.272 302.07 412.462 320.61 425.142 326.123C459.888 341.233 486.052 363.477 504.815 391.867C520.212 415.163 544.122 433.333 572.045 433.333H631.398C654.972 433.333 672.172 409.91 663.878 387.027C663.402 385.71 662.905 384.403 662.392 383.107C650.978 354.287 631.415 333.07 602.448 319.547C575.252 306.85 541.205 301.61 501.095 300.027L500.435 300H499.778C476.152 300 451.475 299.697 427.072 301.213Z" fill={color}/>
    </svg>
  )
}

export default UserIcon;