const API_URL = 'http://127.0.0.1:8000';
const token = localStorage.getItem('meu_token_rsvp');

if (!token) {
    window.location.href = 'index.html';
}

let listaGlobalConvidados = [];

// ==================== CARREGAMENTO ====================
async function carregarConvidados() {
    try {
        const resposta = await fetch(`${API_URL}/admin/convidado`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (resposta.status === 401) return sair();

        const dados = await resposta.json();
        
        if (dados.status === 'sucesso') {
            listaGlobalConvidados = dados.convidado || dados.convidados || [];
            atualizarCards(listaGlobalConvidados);
            renderizarTabela(listaGlobalConvidados);
        } else {
            document.getElementById('tabelaConvidados').innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Erro ao carregar dados.</td></tr>';
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        document.getElementById('tabelaConvidados').innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Erro de conexão com a API.</td></tr>';
    }
}

function atualizarCards(convidados) {
    let totalPessoasConfirmadas = 0;
    let recusados = 0;
    let pendentes = 0;

    convidados.forEach(c => {
        const status = c.status_presenca.toLowerCase();
        
        if (status === 'confirmado') {
            totalPessoasConfirmadas++; // Titular
            if (c.nome_acompanhante && c.nome_acompanhante.length > 0) {
                c.nome_acompanhante.forEach(a => {
                    if (a.idade >= 7) totalPessoasConfirmadas++;
                });
            }
        } else if (status === 'recusado') {
            recusados++;
        } else {
            pendentes++;
        }
    });

    document.getElementById('cardTotal').innerText = convidados.length;
    document.getElementById('cardConfirmados').innerText = totalPessoasConfirmadas;
    document.getElementById('cardPendentes').innerText = pendentes;
    document.getElementById('cardRecusados').innerText = recusados;
}

function renderizarTabela(convidados) {
    const tbody = document.getElementById('tabelaConvidados');
    tbody.innerHTML = '';

    if (convidados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum convidado cadastrado.</td></tr>';
        return;
    }

    convidados.forEach(c => {
        const tr = document.createElement('tr');
        let classeStatus = 'pendente';
        if (c.status_presenca.toLowerCase() === 'confirmado') classeStatus = 'confirmado';
        if (c.status_presenca.toLowerCase() === 'recusado') classeStatus = 'recusado';

        let descAcomp = `${c.limite_acompanhantes} limite`;
        if (c.nome_acompanhante && c.nome_acompanhante.length > 0) {
            const nomes = c.nome_acompanhante.map(a => `${a.nome} (${a.idade}a)`).join(', ');
            descAcomp = `<b>Confirmados:</b> ${nomes}`;
        }

        tr.innerHTML = `
            <td><strong>${c.nome_completo}</strong></td>
            <td>${c.celular}</td>
            <td>${descAcomp}</td>
            <td><span class="status ${classeStatus}">${c.status_presenca.toUpperCase()}</span></td>
            <td>
                <button class="btn-acao btn-zap" onclick="cobrarWhatsApp('${c.nome_completo}', '${c.celular}')">WhatsApp</button>
                <button class="btn-acao btn-editar" onclick="abrirModal(${c.id}, '${c.nome_completo}', '${c.celular}', ${c.limite_acompanhantes})">Editar</button>
                <button class="btn-acao btn-excluir" onclick="excluirConvidado(${c.id}, '${c.nome_completo}')">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function obterConvidadosFiltrados() {
    const termoBusca = document.getElementById('buscaNome').value.toLowerCase();
    const filtroStatus = document.getElementById('filtroStatus').value;

    return listaGlobalConvidados.filter(c => {
        const bateNome = c.nome_completo.toLowerCase().includes(termoBusca);
        const bateStatus = filtroStatus === 'todos' || c.status_presenca.toLowerCase() === filtroStatus;
        return bateNome && bateStatus;
    });
}

function filtrarLista() {
    const filtrados = obterConvidadosFiltrados();
    renderizarTabela(filtrados);
}

// ==================== EXPORTAR CSV ====================
function exportarCSV() {
    const dadosParaExportar = obterConvidadosFiltrados();

    if (dadosParaExportar.length === 0) {
        return alert("Não há dados filtrados para exportar.");
    }
    
    let csv = "Tipo,Nome / Acompanhante,Idade,Celular,Limite Acompanhantes,Status\n";
    
    dadosParaExportar.forEach(c => {
        csv += `"Titular","${c.nome_completo}","-","${c.celular}",${c.limite_acompanhantes},"${c.status_presenca}"\n`;
        
        if (c.nome_acompanhante && c.nome_acompanhante.length > 0) {
            c.nome_acompanhante.forEach(a => {
                csv += `"Acompanhante","${a.nome}",${a.idade},"-","-","-"\n`;
            });
        }
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lista_detalhada_rsvp.csv';
    link.click();
}

function cobrarWhatsApp(nome, celular) {
    const numeroLimpo = celular.replace(/\D/g, '');
    const linkPortal = "http://meusite.com/rsvp"; 
    const mensagem = `Olá, ${nome}! Estamos passando para lembrar de confirmar sua presença no nosso casamento. Por favor, acesse o link e nos avise: ${linkPortal}`;
    const url = `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// ==================== CRUD E MODAL ====================
async function excluirConvidado(id, nome) {
    if(confirm(`Tem certeza que deseja remover ${nome}?`)) {
        const resposta = await fetch(`${API_URL}/admin/convidado/${id}`, {
            method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
        });
        if(resposta.ok) carregarConvidados();
    }
}

function abrirModal(id = '', nome = '', celular = '', limite = 0) {
    document.getElementById('convidadoId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('celular').value = celular;
    document.getElementById('limite').value = limite;
    document.getElementById('modalTitulo').innerText = id ? 'Editar Convidado' : 'Novo Convidado';
    document.getElementById('modalConvidado').classList.add('ativo');
}

function fecharModal() {
    document.getElementById('modalConvidado').classList.remove('ativo');
}

document.getElementById('formConvidado').addEventListener('submit', async function(evento) {
    evento.preventDefault();
    const id = document.getElementById('convidadoId').value;
    const payload = {
        nome_completo: document.getElementById('nome').value,
        celular: document.getElementById('celular').value,
        limite_acompanhantes: parseInt(document.getElementById('limite').value)
    };

    const metodo = id ? 'PUT' : 'POST';
    const rota = id ? `/admin/convidado/${id}` : '/admin/convidados/cadastrar';

    const resposta = await fetch(`${API_URL}${rota}`, {
        method: metodo,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
    });

    if (resposta.ok) {
        fecharModal();
        carregarConvidados(); 
    } else {
        const erro = await resposta.json();
        alert(`Erro: ${erro.detail || erro.mensagem || 'Falha ao salvar'}`);
    }
});

function sair() {
    localStorage.removeItem('meu_token_rsvp');
    window.location.href = 'index.html';
}

carregarConvidados();