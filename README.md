# sampleCron
 一个基于 meteor 的定时任务小框架
------

###example

task params

```javascript
    export default function ({}) {
        return {
            name: 'test cron',  //定时任务名称
            checkCfg: 'testTimer',  //【必须】settings 中定时任务的配置参数 如checkAt 等等，检查的配置会作为schedule和job方法的第一个参数传入
            schedule: function ({testTimer: {checkAt}}) { //可选参数，默认以配置中的checkAt作为该参数
                return checkAt;
            },
            job: function ({testTimer}) { //定时任务逻辑
                //do something...
                console.log('do something here.');

                return true;
            }
        }
    }
```