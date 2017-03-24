/**
 * Created on 2017/3/24.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
import {Meteor} from 'meteor/meteor';
import * as Collections from '/lib/collections/index';
import testCron from './tasks/testCron';
import apis from './apis';

//配置定时任务参数
SyncedCron.config({
    // Log job run details to console
    log: true,
    // Name of collection to use for synchronisation and logging
    collectionName: 'cronHistory',
    // Default to using localTime
    utc: false,
    collectionTTL: 172800
});

let settings = Meteor.settings.timer;
let jobs = {
    testCron
};

let methods = {};
_.each(jobs, function (jobFunc, method) {
    let {checkCfg, name, schedule, job} = jobFunc(Collections, apis);

    check(checkCfg, Match.OneOf(String, [String]));
    checkCfg = _.isString(checkCfg) ? [checkCfg] : checkCfg;
    //check cron settings
    if (!checkCfg.every((cfg) => cfg in settings)) {
        throw new Meteor.Error('config missing', `task [${method}(${name})] settings [${checkCfg}] is required, please configure it first.`);
    }

    let config = _.pick(settings, checkCfg);
    SyncedCron.add({
        name,
        schedule: function (parser) {
            let time = schedule ? schedule(config) : config[checkCfg[0]].checkAt;
            if (!time)
                throw new Meteor.Error('schedule time missing', `task ${method}(${name}) schedule time is required.`);

            return parser.text(time);
        },
        job: function (...args) {
            return job.call(this, config, ...args);
        }
    });
    methods[method] = () => job.call(null, config);
});

//注册定时任务方法以便手动调用
Meteor.methods(methods);
//启动定时任务
SyncedCron.start();