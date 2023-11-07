
const PieGraph = ({ color, width, height }) => {
  return (
    <svg fill={color} width={width} height={height} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"> 
      <path d="M50.8232,18.1289c-.166-.209-.4082-.3438-.6729-.373-.2715-.0283-.5312,.0498-.7383,.2158l-17.0977,13.8076L13.5562,19.2188c-.4541-.3047-1.0728-.1865-1.3818,.2676-2.731,3.999-4.1743,8.6719-4.1743,13.5137,0,13.2334,10.7666,24,24,24s24-10.7666,24-24c0-5.4609-1.79-10.6035-5.1768-14.8711Zm-18.8899,28.8677c-7.6889-.0364-13.9333-6.2994-13.9333-13.9966,0-2.5143,.6703-4.9481,1.9426-7.098l11.4485,7.6655,.5422,13.4292Zm1.9959-.1455l-.5398-13.369,10.2339-8.2648c1.5544,2.3036,2.3766,4.9727,2.3766,7.7827,0,7.0635-5.2631,12.9062-12.0707,13.8511Zm-1.9293,8.1489c-12.1309,0-22-9.8691-22-22,0-4.1064,1.1328-8.0811,3.2852-11.5557l4.996,3.3452c-1.4916,2.4824-2.2812,5.2985-2.2812,8.2105,0,8.8223,7.1777,16,16,16s16-7.1777,16-16c0-3.2723-.9779-6.3743-2.8198-9.0399l4.686-3.7844c2.708,3.7451,4.1338,8.1572,4.1338,12.8242,0,12.1309-9.8691,22-22,22ZM20.1865,21.249c.1733,.1211,.3735,.1807,.5728,.1807,.2471,0,.4927-.0908,.6836-.2695,2.8682-2.6826,6.6177-4.1602,10.5571-4.1602,3.6055,0,7.1113,1.2637,9.8701,3.5586,.3652,.3037,.8926,.3076,1.2637,.0127l6.3301-5.0596c.2256-.1807,.3623-.4492,.375-.7373s-.0996-.5684-.3086-.7676c-4.7334-4.5186-10.96-7.0068-17.5303-7.0068-7.0425,0-13.8296,2.9521-18.6221,8.0986-.1973,.2119-.293,.499-.2627,.7871,.0308,.2881,.1846,.5479,.4214,.7139l6.6499,4.6494Zm4.3015-4.5554l-5.044-4.032c.728-.4608,1.4833-.8721,2.2561-1.2499l5.3835,4.3012c-.89,.2602-1.7595,.5823-2.5956,.9807Zm5.1301-1.5154l-5.8359-4.6627c.9086-.3405,1.8381-.6203,2.7841-.8467l6.7399,5.3844c-.4337-.0326-.8691-.0532-1.3063-.0532-.8036,0-1.5967,.071-2.3819,.1782Zm15.5713,1.1903l-8.6501-6.9172c3.9703,.7769,7.6715,2.5565,10.7606,5.2303l-2.1104,1.6869Zm-12.3728-7.3323l10.7705,8.613-1.0803,.8635c-1.4898-1.1238-3.1495-1.9938-4.9056-2.5878l-8.4271-6.7323c.9348-.1144,1.8759-.1926,2.8258-.1926,.2741,0,.5439,.0269,.8166,.0362Zm-15.0794,4.8219l4.872,3.8946c-.6668,.4265-1.3154,.8854-1.9246,1.4045l-5.0352-3.5205c.6588-.6404,1.363-1.2239,2.0878-1.7786Z"/>
    </svg>
  )
}

export default PieGraph;