const Queue = require('bull');
const nodemailer = require('nodemailer');

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const emailQueue = new Queue('email', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
    },
});

emailQueue.process(async (job, done) => {
    try {
        const { to, subject, text } = job.data;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        done();
    } catch (error) {
        done(new Error('Failed to send email'));
    }
});

module.exports = emailQueue;

