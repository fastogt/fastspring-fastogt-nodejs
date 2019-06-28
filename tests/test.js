var FastSpring = require('../index');
var fastSpring = new FastSpring(process.env.FS_LOGIN, process.env.FS_PASSWORD);


fastSpring.getOrder(process.env.FS_ORDER_ID, function (err, state) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(state);
});

fastSpring.getSubscriptionState(process.env.FS_SUBSCRIPTION_ID, function (err, state) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(state);
});