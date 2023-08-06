import React from "react";
import {
   Accordion,
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
   AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import "./Value.css";
import data from "../../utils/accordion";
import { useState } from "react";

const Value = () => {
   return (
      <section className="v-wrapper">
         <div className="paddings innerWidth flexCenter v-container">
            {/* left section */}
            <div className="v-left">
               <div className="image-container">
                  <img src="./value.png" />
               </div>
            </div>

            {/* Right side */}
            <div className="flexColStart v-right">
               <span className="orangeText">Our Value</span>
               <span className="primaryText">Value We Give to You</span>
               <span className="secondaryText">
                  We are always ready to help by providing the best services fo
                  you.
                  <br />
                  We believe a good place to live can make your life better
               </span>

               <Accordion
                  className="accordian"
                  allowMultipleExpanded={false}
                  preExpanded={[0]}
               >
                  {data.map((item, i) => {
                     const [className, setClassName] = useState(null);
                     return (
                        <AccordionItem
                           className={`accordian-item ${className}`}
                           key={i}
                           uuid={i}
                        >
                           <AccordionItemHeading>
                              <AccordionItemButton className=" flexCenter accordian-button">
                                 <AccordionItemState>
                                    {({ expanded }) =>
                                       expanded
                                          ? setClassName("expanded")
                                          : setClassName("collapsed")
                                    }
                                 </AccordionItemState>
                                 <div className="flexCenter icon">
                                    {item.icon}
                                 </div>
                                 <span className="primaryText">
                                    {item.heading}
                                 </span>
                                 <div className="flexCenter icon">
                                    <MdOutlineArrowDropDown size={20} />
                                 </div>
                              </AccordionItemButton>
                           </AccordionItemHeading>
                           <AccordionItemPanel>
                              {item.detail}
                           </AccordionItemPanel>
                        </AccordionItem>
                     );
                  })}
               </Accordion>
            </div>
         </div>
      </section>
   );
};

export default Value;
