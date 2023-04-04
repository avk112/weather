import React from 'react';
import classes from "./AnimationBlock.module.scss";

const AnimationBlock = () => {
    return (
            <div className={classes.animationBlock}>
                <div className={classes.animationBlock__inner}> </div>
            </div>
    );
};

export default AnimationBlock;