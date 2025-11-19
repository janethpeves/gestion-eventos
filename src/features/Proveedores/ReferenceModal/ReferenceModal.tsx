/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextAreaField } from "@/components/TextAreaField/TextAreaField";

const StarRating: React.FC<{
  value: number;
  onChange: (val: number) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="text-2xl focus:outline-none"
        >
          {star <= value ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );
};

// 📋 Esquema de validación con Yup
const validationSchema = Yup.object({
  comment: Yup.string().required("El comentario es obligatorio"),
  rating: Yup.number()
    .min(0, "El mínimo es 0")
    .max(5, "El máximo es 5")
    .required("La calificación es obligatoria"),
});

export const CommentForm = ({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) => {
  return (
    <Formik
      initialValues={{
        comment: "",
        rating: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-4 p-1 bg-accent rounded-md">
          {/* Comentario */}
          <div>
            <label className="block mb-1 font-medium">Comentario</label>
            <Field
              name="comment"
              as={TextAreaField}
              placeholder="Escribe tu comentario..."
            />
            <ErrorMessage
              name="comment"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-1 font-medium">Calificación</label>
            <StarRating
              value={values.rating}
              onChange={(val) => setFieldValue("rating", val)}
            />
            <ErrorMessage
              name="rating"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};
