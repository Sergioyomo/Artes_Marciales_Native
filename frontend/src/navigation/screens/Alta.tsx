import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox"
import { CheckIcon } from "@/components/ui/icon"
import {
  useNavigation,
} from '@react-navigation/native';
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { useState } from "react";


import React from "react";

function AltaScreen() {
  const navigation = useNavigation();
  const [activoCheck, setValue] = React.useState(true)
  const [datos, setDatos] = useState({
    nombre: "",
    tipo: "",
    peso: "",
    activo: false,
    fecha_nacimiento:""
  });
  const [datosValidos, setDatosValidos] = useState({
    nombre: false, // NO hay error si vale false
    tipo: false,
    peso: false,
    fecha_nacimiento:false
  });

  const handleSubmit = async () => {
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        const response = await fetch("http://localhost:3000/api/sensei", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          const respuesta = await response.json();
          alert(respuesta.mensaje);
          if (respuesta.ok) {
            navigation.goBack(); // Volver a la página principal
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:" + error);
      }
    }
  };

  function validarDatos() {
    const nombreValido = datos.nombre.trim() !== "";
    const tipoValido = datos.tipo.trim() !== "";
    const pesoValido =
      !isNaN(Number(datos.peso)) && datos.peso.trim() !== "";
    
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    const fechaNacimientoValido = (fecha:string) => {
      if (!fechaRegex.test(fecha)) return false;
      const dateObj = new Date(fecha);
      return dateObj instanceof Date;
  };

    setDatosValidos({
      nombre: !nombreValido, // False si es válido
      tipo: !tipoValido,
      peso: !pesoValido,
      fecha_nacimiento:!fechaNacimientoValido(datos.fecha_nacimiento)
    });

    // Si todos los campos son válidos, devolvemos true
    return nombreValido && tipoValido && pesoValido && fechaNacimientoValido;
  }

  return (
    <VStack className="w-full max-w-[500px] rounded-md border border-background-200 p-4">
      <FormControl
        isInvalid={datosValidos.nombre}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Nombre</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Nombre del sensei"
            value={datos.nombre}
            onChangeText={(text) => setDatos({ ...datos, nombre: text })}
          />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            El nombre del sensei es obligatorio
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl
        isInvalid={datosValidos.tipo}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Tipo</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Tipo del arte marcial"
            value={datos.tipo}
            onChangeText={(text) => setDatos({ ...datos, tipo: text })}
          />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            El tipo del arte marcial es obligatoria
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl
        isInvalid={datosValidos.peso}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Peso</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Peso del sensei"
            value={datos.peso}
            onChangeText={(text) => setDatos({ ...datos, peso: text })}
          />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>El peso debe ser un número</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl
        isInvalid={datosValidos.fecha_nacimiento}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Fecha nacimiento</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="sm">
          <InputField
            type="text"
            placeholder="Fecha nacimiento del sensei"
            value={datos.fecha_nacimiento}
            onChangeText={(text) => setDatos({ ...datos, fecha_nacimiento: text })}
          />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>La fecha de nacimiento es obligatoria y debe tener un formato YYYY-MM-DD</FormControlErrorText>
        </FormControlError>
      </FormControl>

      {/* TODO: poner un checkbox */}
      <FormControl
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Activo</FormControlLabelText>
        </FormControlLabel>
        <Checkbox 
          className="my-1"
          size="sm" 
          isInvalid={false} 
          isDisabled={false}
          value="activo"
          isChecked={activoCheck}
          onChange={(activoValue) => {
            setDatos({ ...datos, activo: activoValue })
            setValue(activoValue)
          }}>
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Activo</CheckboxLabel>
        </Checkbox>
      </FormControl>

      <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
        <ButtonText>Aceptar</ButtonText>
      </Button>
    </VStack>
  );
}

export default AltaScreen;
