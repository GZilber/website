import { WORKER_URL } from '../consts'; // If you created a constants file

export const emailService = {
  submit: async (data: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    company?: string;
    role?: string; 
    file?: File | null 
  }) => {
    try {
      const name = `${data.firstName} ${data.lastName}`;
      let attachment = null;

      // 1. Handle File (if it's a Career Submission)
      if (data.file) {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!allowedTypes.includes(data.file.type)) throw new Error("Invalid file type");

        const base64Content = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(data.file as File);
        });

        attachment = { content: base64Content, filename: data.file.name };
      }

      // 2. Build Unified Payload
      const payload = {
        name,
        email: data.email,
        subject: data.role ? `Career Application: ${data.role}` : `Website Inquiry: ${data.company}`,
        message: data.role ? `Role: ${data.role}` : `Company: ${data.company}`,
        attachment // Will be null if no file is uploaded
      };

      const response = await fetch('https://send-email.guy-b12.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      return response.ok;
    } catch (error) {
      console.error("Submission failed:", error);
      return false;
    }
  }
};