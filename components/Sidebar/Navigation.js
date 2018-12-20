import Link from "next/link";

const menuTemplate = [
  { link: "/explorer", label: "Explorer" },
  { link: "/transaction", label: "Transaction" }
];

export default () => {
  return (
    <div className="d-flex flex-column">
      {menuTemplate.map((item,index)=>{
        return(
          <div key={index}><Link href={item.link}><a className="text-dark">{item.label}</a></Link></div>
        )
      })}
    </div>
  );
};
