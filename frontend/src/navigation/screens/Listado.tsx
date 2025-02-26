import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { Icon, ArrowRightIcon } from "@/components/ui/icon";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Button, ButtonText } from "@/components/ui/button";

export function ListadoScreen() {
  interface Sensei {
    idSensei: number;
    nombre: string;
    tipo: string;
    peso: number;
    activo: boolean;
    fecha_nacimiento: string;
  }

  const [datos, setDatos] = useState<Sensei[]>([]);

  async function getSenseis() {
    let response = await fetch("http://localhost:3000/api/sensei", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      let data = await response.json();
      setDatos(data.datos);
    }
  }

  useEffect(() => {
    async function getSenseis() {
      let response = await fetch("http://localhost:3000/api/sensei", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      }
    }
    getSenseis();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (idSensei:number) => {
      // Enviamos los datos mediante fetch
      try {
        const response = await fetch("http://localhost:3000/api/sensei/" + idSensei, {
          method: "DELETE",
        });

        if (response.ok) {
            alert("Sensei eliminado");
            getSenseis();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:" + error);
      }
  };

  return (
    <>
      <ScrollView>
        {datos.map((sensei) => (
          <Card key={sensei.idSensei} className="p-5 rounded-lg max-w-[360px] m-3">
            <Text className="text-sm font-normal mb-2 text-typography-700">
              Sensei {sensei.idSensei}
            </Text>
            <Heading size="md" className="mb-4">
              {sensei.nombre}
            </Heading>
            <Text className="text-sm font-normal mb-2 text-typography-700">
              Tipo: {sensei.tipo}
            </Text>
            <Text className="text-sm font-normal mb-2 text-typography-700">
              Fecha Nacimiento: {sensei.fecha_nacimiento}
            </Text>
            <Text className="text-sm font-normal mb-2 text-typography-700">
              Peso: {sensei.peso}
            </Text>
            <Text className="text-sm font-normal mb-2 text-typography-700">
            Activo: {sensei.activo?"Si":"No"}
            </Text>
            <Button className="w-fit self-end mt-4" size="sm" onPress={() => handleDelete(sensei.idSensei)}>
              <ButtonText>
                Borrar
                <Icon
                  as={ArrowRightIcon}
                  size="sm"
                  className="text-info-600 mt-0.5 ml-0.5"
                />
              </ButtonText>
            </Button>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
