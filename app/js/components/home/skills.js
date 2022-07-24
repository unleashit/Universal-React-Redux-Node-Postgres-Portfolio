import React from 'react';

const skills = [
    ['Javascript ES6+', 'full'],
    ['React/Redux', 'half'],
    ['NodeJs', 'half'],
    ['Typescript', 'half'],
    ['React Native', 'half'],
    ['Webpack', 'half'],
    ['Docker', 'half'],
    ['Postgres', 'half'],
    ['MySql', 'half'],
    ['AWS', 'half'],
    ['Linux', 'half'],
    ['Nginx/Apache', 'half'],
    ['Serverless', 'half'],
    ['PHP', 'half'],
    ['AngularJs', 'half'],
    ['Drupal', 'half'],
    ['Wordpress', 'half'],
    ['Html5, CSS3', 'full'],
];

function Skill({ skill, size, color }) {
    return (
        <div className={`skill ${size}`} style={color}>
            {skill}
        </div>
    );
}

export default function Skills({ skillColors }) {
    return (
        <React.Fragment>
            {skills.map(([skill, size]) => (
                <Skill
                    key={skill}
                    skill={skill}
                    size={size}
                    color={skillColors.next().value}
                />
            ))}
        </React.Fragment>
    );
}
