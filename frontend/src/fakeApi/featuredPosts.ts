import Post from '@/types/Post';

const featuredPosts: Post[] = [
  { id: 1, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Machine Learning', 'Data Science', 'Python'], title: '1Quantum Computing: Desvendando a Revolução Digital', description: 'Biodesign: A Fusão Criativa entre Biologia e Tecnologia, Transformando Produtos e Experiências para um Futuro Sustentável', postUrl: '/', createdAt: new Date(2023, 2, 5), updatedAt: new Date(2023, 2, 5), views: 573, likes: 56 },
  { id: 2, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Blockchain', 'Cryptocurrency', 'Smart Contracts'], title: '2Desvendando o Mistério da Criptografia Quântica: Segurança Impenetrável em Redes ultra modernas', description: 'A Era dos Veículos Voadores: Tecnologia Alçando Novos Horizontes', postUrl: '/', createdAt: new Date(2023, 3, 21), updatedAt: new Date(2023, 3, 21), views: 1245, likes: 122 },
  { id: 3, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Augmented Reality', 'VR', 'Immersive Tech'], title: '3Realidade Aumentada: Além do que os olhos veem', description: 'Inteligência Artificial Ética: Explorando Abordagens para Garantir Decisões Justas e Imparciais em Sistemas Autônomos', postUrl: '/', createdAt: new Date(2023, 5, 8), updatedAt: new Date(2023, 5, 8), views: 1987, likes: 189 },
  { id: 4, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Cybersecurity', 'Threat Detection', 'Encryption'], title: '4Inteligência Artificial na Educação: Transformando a Sala de Aula Tradicional', description: 'Robôs na Saúde: Transformando o Cuidado com a Medicina de Precisão', postUrl: '/', createdAt: new Date(2023, 7, 17), updatedAt: new Date(2023, 7, 17), views: 832, likes: 45 },
  { id: 5, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Quantum Computing', 'Qubits', 'Superposition'], title: '5Inteligência Artificial na Medicina: Curando com Algoritmos', description: 'Realidade Virtual no Trabalho: Como a VR está Redefinindo o Escritório', postUrl: '/', createdAt: new Date(2023, 9, 2), updatedAt: new Date(2023, 9, 2), views: 2670, likes: 267 },
  { id: 6, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['IoT', 'Smart Cities', 'Connected Devices'], title: '6Blockchain Descomplicado: Do Bitcoin às Aplicações Empresariais', description: 'Desvendando a Singularidade Tecnológica: Rumo a uma Era de Máquinas Superinteligentes e Transformações Inimagináveis', postUrl: '/', createdAt: new Date(2023, 10, 19), updatedAt: new Date(2023, 10, 19), views: 1498, likes: 148 },
  { id: 7, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Biotechnology', 'Genomics', 'Bioengineering'], title: '7Robôs Colaborativos: Trabalhando Juntos para o Futuro', description: 'Drones de Entrega: A Logística do Futuro nas Asas da Inovação', postUrl: '/', createdAt: new Date(2023, 12, 28), updatedAt: new Date(2023, 12, 28), views: 521, likes: 23 },
  { id: 8, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Space Exploration', 'Satellites', 'Astrophysics'], title: '85G e a Conexão Ultrarrápida: Transformando a Comunicação', description: 'Blockchain Além das Criptomoedas: Transformando Indústrias, Garantindo Transparência e Facilitando a Colaboração Global', postUrl: '/', createdAt: new Date(2023, 2, 14), updatedAt: new Date(2023, 2, 14), views: 2035, likes: 203 },
  { id: 9, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['3D Printing', 'Additive Manufacturing', 'Materials Science'], title: '9Cibersegurança 2.0: Protegendo-se contra Ameaças Avançadas', description: 'Cidades Inteligentes 2.0: Integrando Tecnologias Avançadas para Criar Ambientes Urbanos Mais Eficientes e Sustentáveis', postUrl: '/', createdAt: new Date(2023, 4, 3), updatedAt: new Date(2023, 4, 3), views: 1476, likes: 147 },
  { id: 10, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Artificial General Intelligence', 'Ethics in AI', 'AGI'], title: '10A Revolução dos Veículos Autônomos: Da Ficção à Realidade Conduzida pela Tecn', description: 'A Revolução dos Assistentes Virtuais: Além da Siri e Alexa', postUrl: '/', createdAt: new Date(2023, 6, 22), updatedAt: new Date(2023, 6, 22), views: 1189, likes: 118 },
  { id: 11, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Machine Learning', 'Data Science', 'Python'], title: '11Quantum Computing: Desvendando a Revolução Digital', description: 'Biodesign: A Fusão Criativa entre Biologia e Tecnologia, Transformando Produtos e Experiências para um Futuro Sustentável', postUrl: '/', createdAt: new Date(2023, 2, 5), updatedAt: new Date(2023, 2, 5), views: 573, likes: 56 },
  { id: 12, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Blockchain', 'Cryptocurrency', 'Smart Contracts'], title: '12Desvendando o Mistério da Criptografia Quântica: Segurança Impenetrável em Redes ultra modernas', description: 'A Era dos Veículos Voadores: Tecnologia Alçando Novos Horizontes', postUrl: '/', createdAt: new Date(2023, 3, 21), updatedAt: new Date(2023, 3, 21), views: 1245, likes: 122 },
  { id: 13, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Augmented Reality', 'VR', 'Immersive Tech'], title: '13Realidade Aumentada: Além do que os olhos veem', description: 'Inteligência Artificial Ética: Explorando Abordagens para Garantir Decisões Justas e Imparciais em Sistemas Autônomos', postUrl: '/', createdAt: new Date(2023, 5, 8), updatedAt: new Date(2023, 5, 8), views: 1987, likes: 189 },
  { id: 14, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Cybersecurity', 'Threat Detection', 'Encryption'], title: '14Inteligência Artificial na Educação: Transformando a Sala de Aula Tradicional', description: 'Robôs na Saúde: Transformando o Cuidado com a Medicina de Precisão', postUrl: '/', createdAt: new Date(2023, 7, 17), updatedAt: new Date(2023, 7, 17), views: 832, likes: 45 },
  { id: 15, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Quantum Computing', 'Qubits', 'Superposition'], title: '15Inteligência Artificial na Medicina: Curando com Algoritmos', description: 'Realidade Virtual no Trabalho: Como a VR está Redefinindo o Escritório', postUrl: '/', createdAt: new Date(2023, 9, 2), updatedAt: new Date(2023, 9, 2), views: 2670, likes: 267 },
  { id: 16, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['IoT', 'Smart Cities', 'Connected Devices'], title: '16Blockchain Descomplicado: Do Bitcoin às Aplicações Empresariais', description: 'Desvendando a Singularidade Tecnológica: Rumo a uma Era de Máquinas Superinteligentes e Transformações Inimagináveis', postUrl: '/', createdAt: new Date(2023, 10, 19), updatedAt: new Date(2023, 10, 19), views: 1498, likes: 148 },
  { id: 17, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Biotechnology', 'Genomics', 'Bioengineering'], title: '17Robôs Colaborativos: Trabalhando Juntos para o Futuro', description: 'Drones de Entrega: A Logística do Futuro nas Asas da Inovação', postUrl: '/', createdAt: new Date(2023, 12, 28), updatedAt: new Date(2023, 12, 28), views: 521, likes: 23 },
  { id: 18, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Space Exploration', 'Satellites', 'Astrophysics'], title: '185G e a Conexão Ultrarrápida: Transformando a Comunicação', description: 'Blockchain Além das Criptomoedas: Transformando Indústrias, Garantindo Transparência e Facilitando a Colaboração Global', postUrl: '/', createdAt: new Date(2023, 2, 14), updatedAt: new Date(2023, 2, 14), views: 2035, likes: 203 },
  { id: 19, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['3D Printing', 'Additive Manufacturing', 'Materials Science'], title: '19Cibersegurança 2.0: Protegendo-se contra Ameaças Avançadas', description: 'Cidades Inteligentes 2.0: Integrando Tecnologias Avançadas para Criar Ambientes Urbanos Mais Eficientes e Sustentáveis', postUrl: '/', createdAt: new Date(2023, 4, 3), updatedAt: new Date(2023, 4, 3), views: 1476, likes: 147 },
  { id: 20, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Artificial General Intelligence', 'Ethics in AI', 'AGI'], title: '20A Revolução dos Veículos Autônomos: Da Ficção à Realidade Conduzida pela Tecn', description: 'A Revolução dos Assistentes Virtuais: Além da Siri e Alexa', postUrl: '/', createdAt: new Date(2023, 6, 22), updatedAt: new Date(2023, 6, 22), views: 1189, likes: 118 },
  { id: 21, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Machine Learning', 'Data Science', 'Python'], title: '21Quantum Computing: Desvendando a Revolução Digital', description: 'Biodesign: A Fusão Criativa entre Biologia e Tecnologia, Transformando Produtos e Experiências para um Futuro Sustentável', postUrl: '/', createdAt: new Date(2023, 2, 5), updatedAt: new Date(2023, 2, 5), views: 573, likes: 56 },
  { id: 22, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Blockchain', 'Cryptocurrency', 'Smart Contracts'], title: '22Desvendando o Mistério da Criptografia Quântica: Segurança Impenetrável em Redes ultra modernas', description: 'A Era dos Veículos Voadores: Tecnologia Alçando Novos Horizontes', postUrl: '/', createdAt: new Date(2023, 3, 21), updatedAt: new Date(2023, 3, 21), views: 1245, likes: 122 },
  { id: 23, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Augmented Reality', 'VR', 'Immersive Tech'], title: '23Realidade Aumentada: Além do que os olhos veem', description: 'Inteligência Artificial Ética: Explorando Abordagens para Garantir Decisões Justas e Imparciais em Sistemas Autônomos', postUrl: '/', createdAt: new Date(2023, 5, 8), updatedAt: new Date(2023, 5, 8), views: 1987, likes: 189 },
  { id: 24, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Cybersecurity', 'Threat Detection', 'Encryption'], title: '24Inteligência Artificial na Educação: Transformando a Sala de Aula Tradicional', description: 'Robôs na Saúde: Transformando o Cuidado com a Medicina de Precisão', postUrl: '/', createdAt: new Date(2023, 7, 17), updatedAt: new Date(2023, 7, 17), views: 832, likes: 45 },
  { id: 25, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Quantum Computing', 'Qubits', 'Superposition'], title: '25Inteligência Artificial na Medicina: Curando com Algoritmos', description: 'Realidade Virtual no Trabalho: Como a VR está Redefinindo o Escritório', postUrl: '/', createdAt: new Date(2023, 9, 2), updatedAt: new Date(2023, 9, 2), views: 2670, likes: 267 },
  { id: 26, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['IoT', 'Smart Cities', 'Connected Devices'], title: '26Blockchain Descomplicado: Do Bitcoin às Aplicações Empresariais', description: 'Desvendando a Singularidade Tecnológica: Rumo a uma Era de Máquinas Superinteligentes e Transformações Inimagináveis', postUrl: '/', createdAt: new Date(2023, 10, 19), updatedAt: new Date(2023, 10, 19), views: 1498, likes: 148 },
  { id: 27, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Biotechnology', 'Genomics', 'Bioengineering'], title: '27Robôs Colaborativos: Trabalhando Juntos para o Futuro', description: 'Drones de Entrega: A Logística do Futuro nas Asas da Inovação', postUrl: '/', createdAt: new Date(2023, 12, 28), updatedAt: new Date(2023, 12, 28), views: 521, likes: 23 },
  { id: 28, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Space Exploration', 'Satellites', 'Astrophysics'], title: '285G e a Conexão Ultrarrápida: Transformando a Comunicação', description: 'Blockchain Além das Criptomoedas: Transformando Indústrias, Garantindo Transparência e Facilitando a Colaboração Global', postUrl: '/', createdAt: new Date(2023, 2, 14), updatedAt: new Date(2023, 2, 14), views: 2035, likes: 203 },
  { id: 29, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['3D Printing', 'Additive Manufacturing', 'Materials Science'], title: '29Cibersegurança 2.0: Protegendo-se contra Ameaças Avançadas', description: 'Cidades Inteligentes 2.0: Integrando Tecnologias Avançadas para Criar Ambientes Urbanos Mais Eficientes e Sustentáveis', postUrl: '/', createdAt: new Date(2023, 4, 3), updatedAt: new Date(2023, 4, 3), views: 1476, likes: 147 },
  { id: 30, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Artificial General Intelligence', 'Ethics in AI', 'AGI'], title: '30A Revolução dos Veículos Autônomos: Da Ficção à Realidade Conduzida pela Tecn', description: 'A Revolução dos Assistentes Virtuais: Além da Siri e Alexa', postUrl: '/', createdAt: new Date(2023, 6, 22), updatedAt: new Date(2023, 6, 22), views: 1189, likes: 118 },
  { id: 31, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Machine Learning', 'Data Science', 'Python'], title: '31Quantum Computing: Desvendando a Revolução Digital', description: 'Biodesign: A Fusão Criativa entre Biologia e Tecnologia, Transformando Produtos e Experiências para um Futuro Sustentável', postUrl: '/', createdAt: new Date(2023, 2, 5), updatedAt: new Date(2023, 2, 5), views: 573, likes: 56 },
  { id: 32, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Blockchain', 'Cryptocurrency', 'Smart Contracts'], title: '32Desvendando o Mistério da Criptografia Quântica: Segurança Impenetrável em Redes ultra modernas', description: 'A Era dos Veículos Voadores: Tecnologia Alçando Novos Horizontes', postUrl: '/', createdAt: new Date(2023, 3, 21), updatedAt: new Date(2023, 3, 21), views: 1245, likes: 122 },
  { id: 33, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Augmented Reality', 'VR', 'Immersive Tech'], title: '33Realidade Aumentada: Além do que os olhos veem', description: 'Inteligência Artificial Ética: Explorando Abordagens para Garantir Decisões Justas e Imparciais em Sistemas Autônomos', postUrl: '/', createdAt: new Date(2023, 5, 8), updatedAt: new Date(2023, 5, 8), views: 1987, likes: 189 },
  { id: 34, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Cybersecurity', 'Threat Detection', 'Encryption'], title: '34Inteligência Artificial na Educação: Transformando a Sala de Aula Tradicional', description: 'Robôs na Saúde: Transformando o Cuidado com a Medicina de Precisão', postUrl: '/', createdAt: new Date(2023, 7, 17), updatedAt: new Date(2023, 7, 17), views: 832, likes: 45 },
  { id: 35, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Quantum Computing', 'Qubits', 'Superposition'], title: '34Inteligência Artificial na Medicina: Curando com Algoritmos', description: 'Realidade Virtual no Trabalho: Como a VR está Redefinindo o Escritório', postUrl: '/', createdAt: new Date(2023, 9, 2), updatedAt: new Date(2023, 9, 2), views: 2670, likes: 267 },
  { id: 36, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['IoT', 'Smart Cities', 'Connected Devices'], title: '36Blockchain Descomplicado: Do Bitcoin às Aplicações Empresariais', description: 'Desvendando a Singularidade Tecnológica: Rumo a uma Era de Máquinas Superinteligentes e Transformações Inimagináveis', postUrl: '/', createdAt: new Date(2023, 10, 19), updatedAt: new Date(2023, 10, 19), views: 1498, likes: 148 },
  { id: 37, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Biotechnology', 'Genomics', 'Bioengineering'], title: '37Robôs Colaborativos: Trabalhando Juntos para o Futuro', description: 'Drones de Entrega: A Logística do Futuro nas Asas da Inovação', postUrl: '/', createdAt: new Date(2023, 12, 28), updatedAt: new Date(2023, 12, 28), views: 521, likes: 23 },
  { id: 38, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Space Exploration', 'Satellites', 'Astrophysics'], title: '385G e a Conexão Ultrarrápida: Transformando a Comunicação', description: 'Blockchain Além das Criptomoedas: Transformando Indústrias, Garantindo Transparência e Facilitando a Colaboração Global', postUrl: '/', createdAt: new Date(2023, 2, 14), updatedAt: new Date(2023, 2, 14), views: 2035, likes: 203 },
  { id: 39, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['3D Printing', 'Additive Manufacturing', 'Materials Science'], title: '39Cibersegurança 2.0: Protegendo-se contra Ameaças Avançadas', description: 'Cidades Inteligentes 2.0: Integrando Tecnologias Avançadas para Criar Ambientes Urbanos Mais Eficientes e Sustentáveis', postUrl: '/', createdAt: new Date(2023, 4, 3), updatedAt: new Date(2023, 4, 3), views: 1476, likes: 147 },
  { id: 40, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Artificial General Intelligence', 'Ethics in AI', 'AGI'], title: '40A Revolução dos Veículos Autônomos: Da Ficção à Realidade Conduzida pela Tecn', description: 'A Revolução dos Assistentes Virtuais: Além da Siri e Alexa', postUrl: '/', createdAt: new Date(2023, 6, 22), updatedAt: new Date(2023, 6, 22), views: 1189, likes: 118 },
  { id: 41, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Machine Learning', 'Data Science', 'Python'], title: '41Quantum Computing: Desvendando a Revolução Digital', description: 'Biodesign: A Fusão Criativa entre Biologia e Tecnologia, Transformando Produtos e Experiências para um Futuro Sustentável', postUrl: '/', createdAt: new Date(2023, 2, 5), updatedAt: new Date(2023, 2, 5), views: 573, likes: 56 },
  { id: 42, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Blockchain', 'Cryptocurrency', 'Smart Contracts'], title: '42Desvendando o Mistério da Criptografia Quântica: Segurança Impenetrável em Redes ultra modernas', description: 'A Era dos Veículos Voadores: Tecnologia Alçando Novos Horizontes', postUrl: '/', createdAt: new Date(2023, 3, 21), updatedAt: new Date(2023, 3, 21), views: 1245, likes: 122 },
  { id: 43, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Augmented Reality', 'VR', 'Immersive Tech'], title: '43Realidade Aumentada: Além do que os olhos veem', description: 'Inteligência Artificial Ética: Explorando Abordagens para Garantir Decisões Justas e Imparciais em Sistemas Autônomos', postUrl: '/', createdAt: new Date(2023, 5, 8), updatedAt: new Date(2023, 5, 8), views: 1987, likes: 189 },
  { id: 44, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Cybersecurity', 'Threat Detection', 'Encryption'], title: '44Inteligência Artificial na Educação: Transformando a Sala de Aula Tradicional', description: 'Robôs na Saúde: Transformando o Cuidado com a Medicina de Precisão', postUrl: '/', createdAt: new Date(2023, 7, 17), updatedAt: new Date(2023, 7, 17), views: 832, likes: 45 },
  { id: 45, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Quantum Computing', 'Qubits', 'Superposition'], title: '45Inteligência Artificial na Medicina: Curando com Algoritmos', description: 'Realidade Virtual no Trabalho: Como a VR está Redefinindo o Escritório', postUrl: '/', createdAt: new Date(2023, 9, 2), updatedAt: new Date(2023, 9, 2), views: 2670, likes: 267 },
  { id: 46, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['IoT', 'Smart Cities', 'Connected Devices'], title: '46Blockchain Descomplicado: Do Bitcoin às Aplicações Empresariais', description: 'Desvendando a Singularidade Tecnológica: Rumo a uma Era de Máquinas Superinteligentes e Transformações Inimagináveis', postUrl: '/', createdAt: new Date(2023, 10, 19), updatedAt: new Date(2023, 10, 19), views: 1498, likes: 148 },
  { id: 47, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Biotechnology', 'Genomics', 'Bioengineering'], title: '47Robôs Colaborativos: Trabalhando Juntos para o Futuro', description: 'Drones de Entrega: A Logística do Futuro nas Asas da Inovação', postUrl: '/', createdAt: new Date(2023, 12, 28), updatedAt: new Date(2023, 12, 28), views: 521, likes: 23 },
  { id: 48, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Space Exploration', 'Satellites', 'Astrophysics'], title: '485G e a Conexão Ultrarrápida: Transformando a Comunicação', description: 'Blockchain Além das Criptomoedas: Transformando Indústrias, Garantindo Transparência e Facilitando a Colaboração Global', postUrl: '/', createdAt: new Date(2023, 2, 14), updatedAt: new Date(2023, 2, 14), views: 2035, likes: 203 },
  { id: 49, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['3D Printing', 'Additive Manufacturing', 'Materials Science'], title: '49Cibersegurança 2.0: Protegendo-se contra Ameaças Avançadas', description: 'Cidades Inteligentes 2.0: Integrando Tecnologias Avançadas para Criar Ambientes Urbanos Mais Eficientes e Sustentáveis', postUrl: '/', createdAt: new Date(2023, 4, 3), updatedAt: new Date(2023, 4, 3), views: 1476, likes: 147 },
  { id: 50, thumb: '/imgs/featured-post-temp-img.jpg', thumbAlt: 'Imagem de thumb', miniature: '/imgs/temp-miniature.jpg', tags: ['Artificial General Intelligence', 'Ethics in AI', 'AGI'], title: '50A Revolução dos Veículos Autônomos: Da Ficção à Realidade Conduzida pela Tecn', description: 'A Revolução dos Assistentes Virtuais: Além da Siri e Alexa', postUrl: '/', createdAt: new Date(2023, 6, 22), updatedAt: new Date(2023, 6, 22), views: 1189, likes: 118 },
];

export default featuredPosts;
