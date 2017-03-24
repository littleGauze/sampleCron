/**
 * Created on 2017/3/24.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */

export default function ({}, {Utils}) {
    return {
        name: '测试corn',
        checkCfg: 'testTimer',
        //schedule: function ({testTimer: {checkAt}}) {
        //    return checkAt;
        //},
        job: function ({testTimer}) {
            //do something...
            console.log('do something here.');
            Utils.printTime();
            return true;
        }
    }
}
