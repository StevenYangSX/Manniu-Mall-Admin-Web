// import React, { useState } from "react";
// import { Button, Form, FormInstance } from "antd";

// interface SubmitButtonProps {
//   form: FormInstance;
//   onSubmit: Function
// }

// const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, onSubmit, children }) => {
//   const [submittable, setSubmittable] = React.useState<boolean>(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   // Watch all values
//   const values = Form.useWatch([], form);

//   React.useEffect(() => {
//     form
//       .validateFields({ validateOnly: true })
//       .then(() => setSubmittable(true))
//       .catch(() => setSubmittable(false));
//   }, [form, values]);

//   return (
//     <Button
//       type="primary"
//       htmlType="submit"
//       disabled={!submittable}
//       onClick={() => onSubmit(values)}
//       loading={confirmLoading}
//     >
//       {children}
//     </Button>
//   );
// };

// export default SubmitButton;
