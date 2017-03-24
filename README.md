# sampleCron
 一个基于 meteor 的定时任务小框架
------

### example

task params

```javascript
    export default function ({}) {
        return {
            name: 'test cron',  //定时任务名称
            checkCfg: 'testTimer',  //【必须】定时任务参数检查
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
## 注意
1. 所有的定时任务配置放到 `settings.timer`下
2. `checkCfg` 可接受 字符串或者字符串数组
3. `checkCfg` 中检查的配置参数会作为`schedule`和`job`方法的第一个参数传入函数中
