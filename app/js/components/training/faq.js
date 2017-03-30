import React from 'react';
import AccordionPane from '../common/accordionPane';

const FAQs = (props) => {
    return (
        <div className="faqs">
            <h3>Frequently Asked Questions</h3>
           <AccordionPane>
               <h4 className="faq-header">Pricing</h4>
               <div className="faq-body">
                   <p>Each lecture is $60 /hr. with a two hour minimum per session.  Usually we'll meet twice a week for two hours, but once per week is fine if you have a busy schedule.</p>
               </div>
           </AccordionPane>

            <AccordionPane>
                <h4 className="faq-header">Time Required</h4>
                <div className="faq-body">
                    <p>The amount of time we'll need to complete our goals is an approximation and can vary pretty substantially from person to person. The actual time will depend on your existing background, pace you're comfortable with, unique interests and the amount of time you're able to invest in learning. Also while the options might be nice, they aren't required and you could always choose to explore them on your own (possibly with a certain amount of help) if you need to keep the costs down. Studying a lot also helps.</p>
                </div>
            </AccordionPane>

            <AccordionPane>
                <h4 className="faq-header">Location</h4>
                <div className="faq-body">
                    <p>Training is held online via web conferencing software. If you're thinking, "I'm traditional" and feel concerned about working remotely, I highly suggest giving it a try. With the screen and code sharing software we'll use, I believe you'll quickly feel at home with it and in some ways find it even more effective. If you'd really rather meet in person, I can make exceptions although the cost will include a travel fee and you'll need to have a home or office in the Berkeley/Oakland area.</p>
                </div>
            </AccordionPane>

            <AccordionPane>
                <h4 className="faq-header">Homework</h4>
                <div className="faq-body">
                    <p>As mentioned already, web development is a complex field and requires a lot of time to master. Realistically there is way more critical material to learn than we can possibly cover in the short time we have for our meetings. So in addition to the lectures, there will be substantial homework. Some of it will directly relate to what we are doing and some will be supplementary reading or online training material that I have compiled. Trust me that it would be impossible to learn this trade simply by listening to someone else coach you. Take my word for it that you would be better off investing in something else if you aren't ready to work hard and be disciplined!</p>
                </div>
            </AccordionPane>

            <AccordionPane>
                <h4 className="faq-header">Office Time is Included</h4>
                <div className="faq-body">
                    <p>Forget about road blocks. If you're having an issue between lessons, you are encouraged to shoot me an email. Up to approximately 20 minutes of office time per week is included for as long as we are working together.</p>
                </div>
            </AccordionPane>

            <AccordionPane>
                <h4 className="faq-header">Cancellation policy</h4>
                <div className="faq-body">
                    <p>Important events and emergencies come up for everyone, but please provide as much notice as possible if you need to make a change.&nbsp; As a private teacher rescheduling/canceling any time, especially at the last minute, make it difficult to maintain a full schedule. So it's very important that you make a firm commitment when scheduling. If something important comes up and you must cancel/reschedule within 5 days of our appointment, you may be billed a 50% late change fee. <strong>Any and all non-emergency changes made with 24 hours of our appointment are subject to full charge.</strong></p>
                <p>If your other commitments are so much that you think you'll have a difficult time keeping regular appointments, I would prefer that we hold off until you are able to maintain a predictable schedule.</p>
                    <p>I appreciate your understanding.</p>
                </div>
            </AccordionPane>
        </div>
    )
};

export default FAQs;