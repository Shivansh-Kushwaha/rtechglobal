import nodemailer from 'nodemailer';
import aws from '@aws-sdk/client-ses';

const transporter = () => {
    if (process.env.NODE_ENV === 'production') {
        const ses = new aws.SES({
            apiVersion: '2010-12-01',
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        return nodemailer.createTransport({
            SES: { ses, aws },
        });
    } else {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
};

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter().sendMail({
            from: `"RTechGlobal" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendContactUsEmail = async (userEmail, name) => {
    const subject = 'Thank you for contacting us!';
    const text = `Hello ${name},\n\nThank you for contacting us at RTechGlobal. We'll get back to you soon!\n\nBest regards,\nThe RTechGlobal Team`;
    const html = `<p>Hello ${name},</p><p>Thank you for contacting us at RTechGlobal. We'll get back to you soon!</p><p>Best regards,<br>The RTechGlobal Team</p>`;

    await sendEmail(userEmail, subject, text, html);
};

export const sendBookDemoEmail = async (userEmail, name) => {
    const subjectforclient = 'Thank you for booking a demo!';
    const textforclient = `Hello ${name},\n\nThank you for booking a demo with RTechGlobal. We'll get back to you soon!\n\nBest regards,\nThe RTechGlobal Team`;
    const htmlforclient = `<p>Hello ${name},</p><p>Thank you for booking a demo with RTechGlobal. We'll get back to you soon!</p><p>Best regards,<br>The RTechGlobal Team</p>`;

    const subjectfororganiztion = 'New demo booking received';
    const textfororganiztion = `Hello Sir,\n\nYou have received a new demo booking from ${name}. Please check the admin panel for more details.\n\nBest regards,\nThe RTechGlobal Team`;
    const htmlfororganiztion = `<p>Hello Sir,</p><p>You have received a new demo booking from ${name}. Please check the admin panel for more details.</p><p>Best regards,<br>The RTechGlobal Team</p>`;

    await sendEmail(userEmail, subjectforclient, textforclient, htmlforclient);
    await sendEmail('rtechglobaledu@gmail.com', subjectfororganiztion, textfororganiztion, htmlfororganiztion);
};

export const sendForgetPasswordEmail = async (userEmail, name) => {
    const subject = 'Forgot Password Request';
    const text = `Hello ${name},\n\nYou have requested to reset your password. Please click on the following link to reset your password:\n\nhttps://rtechglobal.com/reset-password\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe RTechGlobal Team`;
    const html = `<p>Hello ${name},</p><p>You have requested to reset your password. Please click on the following link to reset your password:</p><p><a href="https://rtechglobal.com/reset-password">Reset Password</a></p><p>If you did not request this, please ignore this email.</p><p>Best regards,<br>The RTechGlobal Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

