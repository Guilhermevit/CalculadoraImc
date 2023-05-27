import { useLocation } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

const Resultado = () => {
  const location = useLocation();
  const { sexo, idade, altura, peso, nivelAtividade } = location.state;
  const [restrictions, setRestrictions] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  var waterInter = Math.round((peso * 35) / 1000);
  var water = (peso * 35) / 1000;

  let tmb = 0;
  if (sexo === "masculino") {
    tmb = 88.36 + 13.4 * peso + 4.8 * altura - 5.7 * idade;
  } else if (sexo === "feminino") {
    tmb = 447.6 + 9.2 * peso + 3.1 * altura - 4.3 * idade;
  }
  var altura2 = altura / 100;
  var IMC = peso / (altura2 * altura2);

  const calcularNecessidadeCalorica = (tmb, nivelAtividade) => {
    let multiplicador = 0;
    switch (nivelAtividade) {
      case "sedentário":
        multiplicador = 1.2;
        break;
      case "leve":
        multiplicador = 1.375;
        break;
      case "moderado":
        multiplicador = 1.55;
        break;
      case "intenso":
        multiplicador = 1.725;
        break;
      default:
        break;
    }
    return tmb * multiplicador;
  };

  const atividade = "moderado"; // Example value for activity level
  const necessidadeCalorica = calcularNecessidadeCalorica(tmb, atividade);

  const classificarIMC = (imc) => {
    if (imc < 18.5) {
      return "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 24.9) {
      return "Peso normal";
    } else if (imc >= 24.9 && imc < 29.9) {
      return "Sobrepeso";
    } else if (imc >= 29.9 && imc < 34.9) {
      return "Obesidade grau I";
    } else if (imc >= 34.9 && imc < 39.9) {
      return "Obesidade grau II";
    } else {
      return "Obesidade grau III (mórbida)";
    }
  };

  const recomendarDieta = (imc, necessidadeCalorica) => {
    const categoria = classificarIMC(imc);

    if (categoria === "Peso normal") {
      return `Manter sua ingestão calórica atual (${necessidadeCalorica.toFixed(
        0
      )} calorias) para manter o peso`;
    } else if (categoria === "Abaixo do peso") {
      const caloriasGanho = necessidadeCalorica + 250;
      return `Aumentar sua ingestão calórica para ${caloriasGanho.toFixed(
        0
      )} calorias por dia para ganhar peso`;
    } else {
      const caloriasPerda = necessidadeCalorica - 500;
      return `Diminuir sua ingestão calórica para ${caloriasPerda.toFixed(
        0
      )} calorias por dia para perder peso`;
    }
  };

  const maxBottleIcons = 4;
  const displayedBottleIcons = Math.min(waterInter, maxBottleIcons);

  // pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const getChatbotResponse = async () => {
    setIsLoading(true);
    const dietaRecomendada = recomendarDieta(IMC, necessidadeCalorica);
    const restricoesTexto = restrictions
      ? `, sendo proibido adicionar ${restrictions}`
      : "";
    const prompt = `Monte para mim uma dieta para 07 dias de uma pessoa do sexo ${sexo}, com TMB de ${tmb.toFixed(
      2
    )}, e IMC de ${IMC.toFixed(
      2
    )}, para ${dietaRecomendada}${restricoesTexto} em suas refeiçoes, dividido por refeições diarias.`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-002/completions",
        {
          prompt: prompt,
          max_tokens: 2500,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (response.data.choices && response.data.choices.length > 0) {
        const chatbotResponseText = response.data.choices[0].text.trim();
        console.log("Chatbot response:", prompt);
        setChatbotResponse(chatbotResponseText);
      } else {
        console.log("No chatbot response received.");
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (chatbotResponse) {
      const imc = classificarIMC(IMC);
      const recomendacao = recomendarDieta(IMC, necessidadeCalorica);

      const docDefinition = {
        content: [
          {
            text: "*Este texto tem como objetivo oferecer uma sugestão geral de dieta para indivíduos que buscam melhorar a qualidade de sua alimentação e adotar hábitos saudáveis. No entanto, é importante destacar que cada pessoa possui necessidades nutricionais específicas e que, por isso, é fundamental procurar o acompanhamento de um médico nutricionista antes de realizar qualquer mudança na dieta:",
            fontSize: 6,
          },
          {
            margin: [0, 0, 0, 0, 0, 5 * 10],
            text: "Sugestão de Dieta criada pela I.A.",
            fontSize: 18,
            alignment: "center",
          },
          { text: chatbotResponse, fontSize: 12 },
        ],
      };

      pdfMake.createPdf(docDefinition).download("Sugestão-Dieta.pdf");
    }
  }, [chatbotResponse, IMC, necessidadeCalorica]);

  return (
    <Box minHeight="100vh" p={4}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box flex="1" textAlign="left">
          <img src="logo.png" alt="Logo" height="20" />
        </Box>
        <Box flex="8" textAlign="center">
          <VStack align="center" my={6}>
            <Heading as="h3" size="lg">
              Calculadora de necessidades calóricas
            </Heading>
          </VStack>
        </Box>
      </Box>

      <VStack
        align="center"
        my={10}
        width={{ base: "80%", md: "70%", lg: "100%" }}
      >
        <HStack spacing={5} width="100%" justifyContent="center">
          {/* Box 1 */}
          <Box
            borderWidth={1}
            borderRadius="md"
            p={4}
            height="300px"
            width="500px"
            marginRight="5px"
          >
            <FormControl id="sexo">
              <FormLabel
                textAlign="center"
                fontSize="24px"
                fontFamily="Helvetica"
              >
                Dados obtidos
              </FormLabel>
            </FormControl>
            <VStack>
              <Box alignItems="flex-start">
                <Text>
                  <b>TMB</b> = {tmb.toFixed(2)}
                </Text>
                <Text>
                  <b>IMC</b> = {IMC.toFixed(2)} ({classificarIMC(IMC)})
                </Text>
                <Text marginBottom="1rem">
                  <b>Necessidade calorica </b> ={" "}
                  {necessidadeCalorica.toFixed(2)} Cal
                </Text>

                <Text marginTop="1rem">
                  <b>De acordo com os dados sugerimos que:</b>
                </Text>
                <Text>
                  {recomendarDieta(IMC, calcularNecessidadeCalorica(tmb))}
                </Text>
              </Box>
            </VStack>
          </Box>
          {/* Box 2 */}
          <Box
            borderWidth={1}
            borderRadius="md"
            p={4}
            height="300px"
            width="500px"
            marginRight="5px"
          >
            <FormControl id="water">
              <FormLabel
                textAlign="center"
                fontSize="24px"
                fontFamily="Helvetica"
              >
                Quantidade de Água Diária
              </FormLabel>
            </FormControl>
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
              >
                {Array.from({ length: displayedBottleIcons }, (_, index) => (
                  <img
                    key={index}
                    src="Garrafa.png"
                    alt="Garrafa"
                    height="50"
                    style={{ margin: 18 }}
                  />
                ))}
              </Box>
            </Flex>
            <Flex>
              <Text>
                Para sua saúde, de acordo com seu peso, você deve tomar
                diariamente <b>{water} Litros</b> de água.
              </Text>
            </Flex>
          </Box>
          {/* Box 3 */}
          <Box
            borderWidth={1}
            borderRadius="md"
            p={4}
            height="300px"
            width="500px"
            marginRight="5px"
          >
            <FormControl id="restrições">
              <FormLabel
                textAlign="center"
                fontSize="24px"
                fontFamily="Helvetica"
              >
                Restrições alimentares?
              </FormLabel>
            </FormControl>
            <Textarea
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
              border="none"
              _focus={{ boxShadow: "none" }}
              resize="none"
              placeholder="Digite suas restrições alimentares aqui..."
            />
          </Box>
        </HStack>
        {/* Box 4 */}
        <Box
          borderWidth={1}
          borderRadius="md"
          p={4}
          height="200px"
          width="1000px"
          marginRight="20px"
        >
          <FormControl id="AI">
            <FormLabel
              textAlign="center"
              fontSize="24px"
              fontFamily="Helvetica"
            >
              Deseja obter uma dieta da nossa I.A.?
            </FormLabel>
          </FormControl>
          <VStack>
            <Button onClick={getChatbotResponse} colorScheme="blue">
              Obter Dieta!
            </Button>
            {isLoading && (
              <Spinner
                thickness="4px"
                speed="1.0s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
          </VStack>
        </Box>
        <HStack
          spacing={5}
          mt={4}
          width="100%"
          justifyContent="center"
        ></HStack>
      </VStack>
    </Box>
  );
};

export default Resultado;
