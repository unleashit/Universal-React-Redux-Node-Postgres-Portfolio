import React from 'react';
import whoAmIicon from '../../../images/home/who-am-i-icon.png';
import whoAmIicon2x from '../../../images/home/who-am-i-icon@2x.png';
import whatIdoIcon from '../../../images/home/what-i-do-icon.png';
import whatIdoIcon2x from '../../../images/home/what-i-do-icon@2x.png';
import whereIamLocatedIcon from '../../../images/home/where-im-located-icon.png';
import whereIamLocatedIcon2x from '../../../images/home/where-im-located-icon@2x.png';

export default class WhoWhatWhere extends React.Component {
    render() {
        return (
            <section className="who-what-where container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Who I am</h3>
                        <p>
                            Someone who has a problem with stereotypes! I began
                            my career in 1999 as a graphic designer, but quickly
                            transitioned into web development and design.
                            Currently, my focus is on Full Stack Javscript,
                            React or CMS development.
                        </p>
                        <img
                            src={whoAmIicon}
                            srcSet={`${whoAmIicon2x} 1.1x`}
                            alt="Who I am"
                            className="who-i-am"
                        />
                    </div>
                    <div className="col-md-4">
                        <h3>What I do</h3>
                        <p>
                            I collaborate with companies to determine user
                            needs, requirements and goals to develop modern user
                            interfaces and/or full stack applications. I am
                            available for your project or a great permanent
                            full-time role.
                        </p>
                        <img
                            src={whatIdoIcon}
                            srcSet={`${whatIdoIcon2x} 1.1x`}
                            alt="What I do"
                            className="what-i-do"
                        />
                    </div>
                    <div className="col-md-4">
                        <h3>Where I'm located</h3>
                        <p>
                            I am a San Francisco native currently living in
                            Berkeley, CA. Depending on your location and needs,
                            I am available to work with you in-house or
                            remotely. I enjoy both and have had plenty of
                            success in both situations.
                        </p>
                        <img
                            src={whereIamLocatedIcon}
                            srcSet={`${whereIamLocatedIcon2x} 1.1x`}
                            alt="Where I'm located"
                            className="where-i-am"
                        />
                    </div>
                </div>
            </section>
        );
    }
}
