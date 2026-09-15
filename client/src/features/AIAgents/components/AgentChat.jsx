import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Sparkles, Info, Plane, Wifi, MapPin, DollarSign, Shield, Star, Clock, Zap, TrendingUp, Coffee, Globe } from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../../../styles/AgentChat.css';

// --- Smart Response Engine ---
const VISA_DATA = {
    bali: { status: 'Visa on Arrival', duration: '30 days', cost: '$35', extendable: true, requirements: ['Passport valid 6+ months', 'Return ticket', '$2,000 in funds'] },
    thailand: { status: 'Visa Exemption', duration: '30 days', cost: 'Free', extendable: true, requirements: ['Passport valid 6+ months', 'Proof of onward travel'] },
    portugal: { status: 'Schengen Zone', duration: '90 days', cost: 'Free (EU/US)', extendable: false, requirements: ['Valid passport', 'Travel insurance', 'Proof of accommodation'] },
    mexico: { status: 'Visa Free', duration: '180 days', cost: 'Free', extendable: false, requirements: ['Valid passport', 'FMM tourist card (free at entry)'] },
    japan: { status: 'Visa Exemption', duration: '90 days', cost: 'Free', extendable: false, requirements: ['Valid passport', 'Return ticket', 'Hotel bookings'] },
    colombia: { status: 'Visa Free', duration: '90 days', cost: 'Free', extendable: true, requirements: ['Valid passport', 'Proof of funds', 'Onward travel'] },
};

const FLIGHT_DATA = {
    bali: [{ airline: 'Singapore Airlines', price: '$420', duration: '9h 30m', stops: '1 stop' }, { airline: 'AirAsia', price: '$280', duration: '14h', stops: '1 stop' }, { airline: 'Emirates', price: '$510', duration: '11h', stops: '1 stop' }],
    thailand: [{ airline: 'Thai Airways', price: '$380', duration: '11h', stops: 'Direct' }, { airline: 'Scoot', price: '$220', duration: '13h', stops: '1 stop' }],
    portugal: [{ airline: 'TAP Air Portugal', price: '$650', duration: '7h', stops: 'Direct' }, { airline: 'Ryanair', price: '$290', duration: '9h', stops: '1 stop' }],
    japan: [{ airline: 'JAL', price: '$820', duration: '14h', stops: 'Direct' }, { airline: 'ANA', price: '$750', duration: '12h', stops: '1 stop' }],
};

const SPOT_DATA = {
    bali: [{ name: 'Dojo Bali', type: 'Coworking', wifi: '120 Mbps', rating: 4.8, price: '$15/day', area: 'Canggu' }, { name: 'Outpost Ubud', type: 'Cafe+Work', wifi: '85 Mbps', rating: 4.6, price: '$8/day', area: 'Ubud' }, { name: 'Tropical Nomad', type: 'Cafe', wifi: '60 Mbps', rating: 4.4, price: '$5/day', area: 'Seminyak' }],
    lisbon: [{ name: 'Second Home Lisboa', type: 'Coworking', wifi: '250 Mbps', rating: 4.9, price: '$25/day', area: 'Cais do Sodré' }, { name: 'Fabrica Coffee Roasters', type: 'Cafe', wifi: '150 Mbps', rating: 4.7, price: 'Free', area: 'Principe Real' }],
    medellin: [{ name: 'Selina Medellin', type: 'Coliving+Work', wifi: '300 Mbps', rating: 4.7, price: '$18/day', area: 'El Poblado' }, { name: 'Pergamino Café', type: 'Cafe', wifi: '100 Mbps', rating: 4.9, price: 'Free', area: 'El Poblado' }],
};

const COST_DATA = {
    bali: { monthly: '$1,200 - $2,000', rent: '$400 - $800', food: '$200 - $400', transport: '$80', internet: '$30', nomadScore: 9.2 },
    lisbon: { monthly: '$2,000 - $3,500', rent: '$1,200 - $2,000', food: '$400 - $600', transport: '$45', internet: '$35', nomadScore: 8.8 },
    medellin: { monthly: '$1,000 - $1,800', rent: '$400 - $800', food: '$250 - $400', transport: '$30', internet: '$20', nomadScore: 9.0 },
    chiang_mai: { monthly: '$800 - $1,500', rent: '$250 - $500', food: '$150 - $300', transport: '$40', internet: '$25', nomadScore: 9.4 },
    tbilisi: { monthly: '$700 - $1,200', rent: '$300 - $600', food: '$150 - $250', transport: '$20', internet: '$15', nomadScore: 8.6 },
};

const generateSmartResponse = (input, agent) => {
    const lower = input.toLowerCase();
    
    // Find what city is mentioned
    const cities = ['bali', 'thailand', 'portugal', 'lisbon', 'japan', 'mexico', 'colombia', 'medellin', 'chiang_mai', 'tbilisi', 'chiang mai'];
    const foundCity = cities.find(c => lower.includes(c)) || 'bali';
    const cityKey = foundCity.replace(' ', '_');
    
    if (agent.specialResponses) {
        for (const sr of agent.specialResponses) {
            if (sr.triggers.some(t => lower.includes(t))) {
                if (sr.responseType === 'visa_card') {
                    const data = VISA_DATA[cityKey] || VISA_DATA['bali'];
                    return { type: 'visa_card', city: foundCity, data };
                }
                if (sr.responseType === 'flight_card') {
                    const data = FLIGHT_DATA[cityKey] || FLIGHT_DATA['bali'];
                    return { type: 'flight_card', city: foundCity, data };
                }
                if (sr.responseType === 'spot_card') {
                    const data = SPOT_DATA[cityKey] || SPOT_DATA['bali'];
                    return { type: 'spot_card', city: foundCity, data };
                }
                if (sr.responseType === 'cost_card') {
                    const data = COST_DATA[cityKey] || COST_DATA['bali'];
                    return { type: 'cost_card', city: foundCity, data };
                }
            }
        }
    }

    // Agent-specific smart defaults
    if (agent.id === 'wanda' && (lower.includes('wifi') || lower.includes('internet') || lower.includes('speed'))) {
        const data = SPOT_DATA[cityKey] || SPOT_DATA['bali'];
        return { type: 'spot_card', city: foundCity, data };
    }
    if (agent.id === 'vance' || lower.includes('visa')) {
        const data = VISA_DATA[cityKey] || VISA_DATA['bali'];
        return { type: 'visa_card', city: foundCity, data };
    }
    if (agent.id === 'bento' || lower.includes('cost')) {
        const data = COST_DATA[cityKey] || COST_DATA['bali'];
        return { type: 'cost_card', city: foundCity, data };
    }

    return { type: 'text', text: getTextResponse(agent, input, foundCity) };
};

const getTextResponse = (agent, input, city) => {
    const responses = {
        atlas: [`Great question! ${city.charAt(0).toUpperCase() + city.slice(1)} is one of my top recommendations right now. The digital nomad scene there is thriving — great infrastructure, lower cost than most Western cities, and a welcoming expat community. Want me to break down the visa rules, flight options, or the best coworking spots? 🌍`, `${city.charAt(0).toUpperCase() + city.slice(1)} is absolutely worth it. Pro tip: visit during shoulder season for better prices and fewer crowds. I can pull up detailed cost of living data, fast Wi-Fi spots, or visa requirements — just ask! 🗺️`],
        aria: [`${city.charAt(0).toUpperCase() + city.slice(1)} is on fire right now! I'd suggest starting with the old town area — tons of hidden gems off the main tourist path. Want me to put together a custom 7-day itinerary? ✈️`],
        sora: [`The nomad community in ${city.charAt(0).toUpperCase() + city.slice(1)} is super active! There are weekly meetups at coworking spaces and lots of Facebook groups and Meetup events to join. Want me to find upcoming events? 👥`],
        remi: [`Oh, the food in ${city.charAt(0).toUpperCase() + city.slice(1)}! You MUST try the local specialties. I have curated recommendations from 200+ nomads who've been there. My top pick: skip the tourist restaurants and head to where the locals eat — always better and half the price. 🍜`],
        wanda: [`I've got ${city.charAt(0).toUpperCase() + city.slice(1)} covered! Based on recent speed tests from nomads there, the fastest spots are at dedicated coworking spaces. Cafe Wi-Fi can be hit or miss. Want the full breakdown with speeds? 📡`],
        default: [`Based on my analysis of ${city.charAt(0).toUpperCase() + city.slice(1)}, here's what I recommend for digital nomads...`]
    };
    const agentResponses = responses[agent.id] || responses.default;
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
};

// --- Rich Response Card Components ---
const VisaCard = ({ city, data }) => (
    <div className="ai-response-card visa-card">
        <div className="card-header-strip visa-strip">
            <Shield size={16} />
            <span>Visa Intelligence · {city.charAt(0).toUpperCase() + city.slice(1)}</span>
        </div>
        <div className="card-body">
            <div className="visa-status-badge" data-status={data.status.toLowerCase().includes('free') ? 'free' : 'paid'}>
                <Globe size={14} />
                {data.status}
            </div>
            <div className="visa-meta-grid">
                <div className="visa-meta-item"><Clock size={14}/><span>{data.duration}</span></div>
                <div className="visa-meta-item"><DollarSign size={14}/><span>{data.cost}</span></div>
                <div className="visa-meta-item"><Zap size={14}/><span>{data.extendable ? 'Extendable' : 'Non-extendable'}</span></div>
            </div>
            <div className="requirements-list">
                <p className="req-label">Requirements</p>
                {data.requirements.map((r, i) => <div key={i} className="req-item">✓ {r}</div>)}
            </div>
        </div>
    </div>
);

const FlightCard = ({ city, data }) => (
    <div className="ai-response-card flight-card">
        <div className="card-header-strip flight-strip">
            <Plane size={16} />
            <span>Live Flight Estimates · To {city.charAt(0).toUpperCase() + city.slice(1)}</span>
        </div>
        <div className="flight-list">
            {data.map((f, i) => (
                <div key={i} className="flight-item">
                    <div className="flight-airline">{f.airline}</div>
                    <div className="flight-details">
                        <span className="flight-stops">{f.stops}</span>
                        <span className="flight-duration">{f.duration}</span>
                    </div>
                    <div className="flight-price">{f.price}</div>
                </div>
            ))}
        </div>
        <p className="card-note">* Prices are estimates. Book via partner sites for live rates.</p>
    </div>
);

const SpotCard = ({ city, data }) => (
    <div className="ai-response-card spot-card">
        <div className="card-header-strip spot-strip">
            <Wifi size={16} />
            <span>Top Nomad Spots · {city.charAt(0).toUpperCase() + city.slice(1)}</span>
        </div>
        <div className="spot-list">
            {data.map((s, i) => (
                <div key={i} className="spot-item">
                    <div className="spot-icon-wrap">
                        <Coffee size={18} />
                    </div>
                    <div className="spot-info">
                        <div className="spot-name">{s.name}</div>
                        <div className="spot-area">{s.area} · {s.type}</div>
                    </div>
                    <div className="spot-stats">
                        <div className="wifi-speed">{s.wifi}</div>
                        <div className="spot-rating"><Star size={12} fill="gold" stroke="gold"/>{s.rating}</div>
                        <div className="spot-price">{s.price}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const CostCard = ({ city, data }) => (
    <div className="ai-response-card cost-card">
        <div className="card-header-strip cost-strip">
            <DollarSign size={16} />
            <span>Cost of Living · {city.charAt(0).toUpperCase() + city.slice(1)}</span>
        </div>
        <div className="cost-body">
            <div className="nomad-score">
                <span className="score-value">{data.nomadScore}</span>
                <span className="score-label">Nomad Score</span>
            </div>
            <div className="cost-breakdown">
                <div className="cost-row"><span>Monthly Total</span><strong>{data.monthly}</strong></div>
                <div className="cost-row"><span>Rent</span><strong>{data.rent}</strong></div>
                <div className="cost-row"><span>Food</span><strong>{data.food}</strong></div>
                <div className="cost-row"><span>Transport</span><strong>{data.transport}</strong></div>
                <div className="cost-row"><span>Internet</span><strong>{data.internet}</strong></div>
            </div>
        </div>
    </div>
);

const QuickPrompts = ({ agent, onSelect }) => {
    const prompts = {
        atlas: ['Visa-free countries for Indians', 'Cheapest flights to Bali', 'Cost of living in Medellin', 'Best coworking in Lisbon'],
        vance: ['Thailand visa requirements', 'Portugal D7 visa', 'Digital nomad visa Germany', 'Mexico tourist card rules'],
        bento: ['Cost of Bali vs Chiang Mai', 'Budget for 6 months abroad', 'Currency in Japan', 'Cheapest nomad cities 2025'],
        sora: ['Nomad meetups in Bali', 'Find co-working buddies', 'Lisbon Facebook groups', 'Remote team events'],
        wanda: ['Fastest cafes in Chiang Mai', 'Hotel Wi-Fi in Tokyo', 'Speed tests in Medellin', 'Best coworking Tbilisi'],
        remi: ['Best street food in Bangkok', 'Vegetarian options Bali', 'Local food Lisbon', 'Hidden gems Mexico City'],
        default: ['Tell me about Bali', 'Best time to travel', 'Digital nomad tips', 'Where should I go?'],
    };
    const list = prompts[agent.id] || prompts.default;
    return (
        <div className="quick-prompts">
            {list.map((p, i) => (
                <button key={i} className="prompt-chip" onClick={() => onSelect(p)}>
                    {p}
                </button>
            ))}
        </div>
    );
};

const AgentChat = ({ agent, onBack }) => {
    const { conversations, addMessage, increaseAffinity, currentContext, isPremium, addXP } = useNomadOSStore();
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const messages = conversations[agent.id] || [
        { role: 'ai', type: 'text', text: agent.initialMessage, timestamp: new Date().toISOString() }
    ];

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

    const handleSend = (textOverride) => {
        const text = textOverride || input;
        if (!text.trim()) return;

        if (agent.isPremium && !isPremium) {
            addMessage(agent.id, { role: 'ai', type: 'text', text: '⚡ This agent requires Nomad Pro for deeper analysis. Please upgrade to continue.', timestamp: new Date().toISOString() });
            return;
        }

        const userMsg = { role: 'user', type: 'text', text, timestamp: new Date().toISOString() };
        addMessage(agent.id, userMsg);
        setInput('');
        setIsTyping(true);
        addXP(5);

        setTimeout(() => {
            const response = generateSmartResponse(text, agent);
            const aiMsg = { role: 'ai', ...response, timestamp: new Date().toISOString() };
            addMessage(agent.id, aiMsg);
            increaseAffinity(agent.id, 2);
            addXP(10);
            setIsTyping(false);
        }, 1200 + Math.random() * 600);
    };

    const renderMessage = (msg, i) => {
        if (msg.role === 'user') {
            return (
                <div key={i} className="message user">
                    <div className="message-bubble">{msg.text}</div>
                    <div className="message-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            );
        }
        return (
            <div key={i} className="message ai">
                {msg.type === 'visa_card' ? <VisaCard city={msg.city} data={msg.data} /> :
                 msg.type === 'flight_card' ? <FlightCard city={msg.city} data={msg.data} /> :
                 msg.type === 'spot_card' ? <SpotCard city={msg.city} data={msg.data} /> :
                 msg.type === 'cost_card' ? <CostCard city={msg.city} data={msg.data} /> :
                 <div className="message-bubble">{msg.text}</div>}
                <div className="message-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        );
    };

    const Icon = agent.icon;

    return (
        <div className="agent-chat-container" style={{ '--agent-color': agent.color, '--agent-color-alpha': `${agent.color}20` }}>
            <div className="chat-header">
                <div className="chat-agent-info">
                    <button className="nav-btn" onClick={onBack}><ArrowLeft size={20} /></button>
                    <div className="chat-agent-avatar"><Icon size={24} /></div>
                    <div>
                        <h3>{agent.name}</h3>
                        <div className="agent-role" style={{ marginBottom: 0 }}>{agent.role}</div>
                    </div>
                </div>
                <div className="chat-header-actions">
                    {currentContext && (
                        <div className="context-pill"><Info size={14} /><span>Context: {currentContext.name}</span></div>
                    )}
                    <div className="ai-status"><Sparkles size={16} className="text-yellow-400" /><span>AI Active</span></div>
                </div>
            </div>

            <div className="agent-capabilities">
                {agent.capabilities?.map((cap, i) => (
                    <span key={i} className="capability-tag">{cap}</span>
                ))}
            </div>

            <div className="chat-messages">
                {messages.map((msg, i) => renderMessage(msg, i))}
                {isTyping && (
                    <div className="message ai typing">
                        <div className="message-bubble">
                            <div className="typing-indicator"><span></span><span></span><span></span></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
                <QuickPrompts agent={agent} onSelect={(p) => handleSend(p)} />
            )}

            <div className="chat-input-wrapper">
                <input
                    type="text"
                    className="chat-input"
                    placeholder={`Ask ${agent.name} anything...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="send-btn" onClick={() => handleSend()}><Send size={20} /></button>
            </div>
        </div>
    );
};

export default AgentChat;
