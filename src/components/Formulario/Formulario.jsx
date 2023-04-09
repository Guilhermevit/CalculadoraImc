import React, { useState } from "react";
import "./Formulario.css";
import {
  Box,
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Image,
  Select,
  useRadioGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CustomRadio = ({ iconSrc, ...props }) => {
  return (
    <Radio {...props}>
      <HStack>
        <Image src={iconSrc} boxSize="90px" />
        {props.children}
      </HStack>
    </Radio>
  );
};
const Formulario = () => {
  const [sexo, setSexo] = useState("masculino");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [nivelAtividade, setNivelAtividade] = useState("sedentário");
  const isFormComplete = sexo && idade && altura && peso;
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "sexo",
    defaultValue: "masculino",
    onChange: (value) => setSexo(value),
  });

  const group = getRootProps();

  const handleClick = (e) => {
    e.preventDefault();

    if (!isFormComplete) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
      navigate("/resultado", {
        state: { sexo, idade, altura, peso, nivelAtividade },
      });
    }
  };

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
      <form onSubmit={handleClick}>
        <VStack
          align="center"
          my={10}
          width={{ base: "100%", md: "70%", lg: "100%" }}
        >
          <HStack spacing={5} width="100%" justifyContent="center">
            {/* Box 1 */}

            <Box
              borderWidth={1}
              borderRadius="md"
              p={4}
              height="200px"
              width="400px"
              marginRight="20px"
            >
              <FormControl id="sexo">
                <FormLabel
                  textAlign="center"
                  fontSize="24px"
                  fontFamily="Helvetica"
                >
                  Qual seu sexo?
                </FormLabel>
                <RadioGroup value={sexo} onChange={(value) => setSexo(value)}>
                  <HStack spacing="70px" alignItems="center">
                    <CustomRadio value="masculino" iconSrc="male.png">
                      Homem
                    </CustomRadio>
                    <CustomRadio value="feminino" iconSrc="female.png">
                      Mulher
                    </CustomRadio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Box 2 */}
            <Box
              borderWidth={1}
              borderRadius="md"
              p={4}
              height="200px"
              width="400px"
              marginRight="20px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <FormControl id="idade">
                <FormLabel
                  mb={81}
                  textAlign="center"
                  fontSize="24px"
                  fontFamily="Helvetica"
                >
                  Qual sua idade?
                </FormLabel>
                <Input
                  type="number"
                  placeholder="25"
                  _placeholder={{ color: "gray.300" }}
                  borderColor="transparent"
                  borderBottomColor={
                    showErrorMessage && !idade ? "red.500" : "blue.500"
                  }
                  focusBorderColor={
                    showErrorMessage && !idade ? "red.500" : "blue.500"
                  }
                  borderWidth="4px"
                  borderRadius="0"
                  fontWeight="bold"
                  textAlign="center"
                  fontSize="xl"
                  py={1}
                  onChange={(e) => {
                    e.target.value === "" && e.target.blur();
                    setIdade(e.target.value);
                  }}
                  _focus={{
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    borderBottom: "4px solid",
                    borderColor: "blue.500",
                  }}
                  _hover={{
                    border: "none",
                    borderBottom: "4px solid",
                    borderColor: "blue.500",
                  }}
                  sx={{
                    "::-webkit-inner-spin-button, ::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  }}
                />
                <FormLabel
                  mb={17}
                  textAlign="center"
                  fontSize="18px"
                  fontFamily="Helvetica"
                >
                  Anos
                </FormLabel>
              </FormControl>
            </Box>
          </HStack>

          <HStack spacing={5} mt={4} width="100%" justifyContent="center">
            {/* Box 3 */}

            <Box
              borderWidth={1}
              borderRadius="md"
              p={4}
              height="200px"
              width="400px"
              marginRight="20px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <FormControl id="altura">
                <FormLabel
                  mb={81}
                  textAlign="center"
                  fontSize="24px"
                  fontFamily="Helvetica"
                >
                  Qual sua Altura?
                </FormLabel>
                <Input
                  type="number"
                  placeholder="150"
                  _placeholder={{ color: "gray.300" }}
                  borderColor="transparent"
                  borderBottomColor={
                    showErrorMessage && !altura ? "red.500" : "blue.500"
                  }
                  focusBorderColor={
                    showErrorMessage && !altura ? "red.500" : "blue.500"
                  }
                  borderWidth="4px"
                  borderRadius="0"
                  fontWeight="bold"
                  textAlign="center"
                  fontSize="xl"
                  py={1}
                  onChange={(e) => {
                    e.target.value === "" && e.target.blur();
                    setAltura(e.target.value);
                  }}
                  _focus={{
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    borderBottom: "4px solid",
                    borderColor: "blue.500",
                  }}
                  _hover={{
                    border: "none",
                    borderBottom: "4px solid",
                    borderColor: "blue.500",
                  }}
                  sx={{
                    "::-webkit-inner-spin-button, ::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  }}
                />
                <FormLabel
                  mb={17}
                  textAlign="center"
                  fontSize="18px"
                  fontFamily="Helvetica"
                >
                  Cm
                </FormLabel>
              </FormControl>
            </Box>
            {/* Box 4 */}
            <Box
              borderWidth={1}
              borderRadius="md"
              p={4}
              height="200px"
              width="400px"
              marginRight="20px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <FormControl id="peso">
                <FormLabel
                  mb={81}
                  textAlign="center"
                  fontSize="24px"
                  fontFamily="Helvetica"
                >
                  Qual seu peso?
                </FormLabel>
                <Input
                  type="number"
                  placeholder="50"
                  _placeholder={{ color: "gray.300" }}
                  borderColor="transparent"
                  borderBottomColor={
                    showErrorMessage && !peso ? "red.500" : "blue.500"
                  }
                  focusBorderColor={
                    showErrorMessage && !peso ? "red.500" : "blue.500"
                  }
                  borderWidth="4px"
                  borderRadius="0"
                  fontWeight="bold"
                  textAlign="center"
                  fontSize="xl"
                  py={1}
                  onChange={(e) => {
                    e.target.value === "" && e.target.blur();
                    setPeso(e.target.value);
                  }}
                  _focus={{
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    borderBottom: "4px solid",
                    borderColor: "blue.500",
                  }}
                  _hover={{
                    border: "none",
                    borderBottom: "4px solid",
                    borderColor: "blue.500",
                  }}
                  sx={{
                    "::-webkit-inner-spin-button, ::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  }}
                />
                <FormLabel
                  mb={17}
                  textAlign="center"
                  fontSize="18px"
                  fontFamily="Helvetica"
                >
                  Kg
                </FormLabel>
              </FormControl>
            </Box>
          </HStack>
          <HStack spacing={5} mt={4} width="100%" justifyContent="center">
            {/* Box 5 */}
            <Box
              borderWidth={1}
              borderRadius="md"
              p={4}
              height="200px"
              width="400px"
              marginRight="20px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <FormControl id="activity-level">
                <FormLabel
                  mb={81}
                  textAlign="center"
                  fontSize="24px"
                  fontFamily="Helvetica"
                >
                  Qual seu nível de atividade diária?
                </FormLabel>
                <Select
                  value={nivelAtividade}
                  onChange={(e) => setNivelAtividade(e.target.value)}
                >
                  <option value="Sedentário">Sedentário</option>
                  <option value="Leve">Leve</option>
                  <option value="Moderado">Moderado</option>
                  <option value="Intenso">Intenso</option>
                </Select>
              </FormControl>
            </Box>
            {/* Box 6 */}

            <Box
              borderWidth={0}
              borderRadius="md"
              p={4}
              height="200px"
              width="400px"
              marginRight="20px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <FormControl id="calcular">
                <FormLabel
                  textAlign="center"
                  fontSize="24px"
                  fontFamily="Helvetica"
                >
                  <button type="submit" onClick={handleClick}>
                    Calcular
                  </button>
                  {showErrorMessage && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      Favor preencher as linhas em vermelho
                    </p>
                  )}
                </FormLabel>
              </FormControl>
            </Box>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default Formulario;
