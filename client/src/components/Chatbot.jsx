import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../lib/icons.jsx';
import { siteData } from '../data/siteData.js';
import { sendChatMessage } from '../lib/api.js';
import styles from './Chatbot.module.css';

const MAX_INPUT_LENGTH = 800;
const MAX_HISTORY = 10;
const REQUEST_TIMEOUT_MS = 30000;

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Namaste! Main Vishwas Assistant hoon. Products, timings ya location Hinglish me poochhein.',
};

const QUICK_PROMPTS = [
  'Aapke paas kya milta hai?',
  'Shop ka address kya hai?',
  'Timings kya hain?',
  'Price ke liye kaise poochun?',
];

const primaryPhone = siteData.contact.phones[0];
const whatsapp = siteData.contact.whatsapp;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const launcherRef = useRef(null);
  const panelRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const requestRef = useRef(null);
  const requestSequence = useRef(0);
  const messageSequence = useRef(0);

  const nextMessageId = () => {
    messageSequence.current += 1;
    return `chat-${messageSequence.current}`;
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const timer = window.setTimeout(() => inputRef.current?.focus(), 90);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isMinimized) return;

    const log = logRef.current;
    if (!log) return;

    const isInitialView = messages.length === 1 && status === 'idle' && !error;
    log.scrollTop = isInitialView ? 0 : log.scrollHeight;
  }, [isOpen, isMinimized, messages, status, error]);

  useEffect(() => {
    const element = inputRef.current;
    if (!element) return;

    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, 112)}px`;
  }, [input, isOpen]);

  useEffect(
    () => () => {
      requestSequence.current += 1;
      requestRef.current?.abort();
    },
    []
  );

  const closeChat = () => {
    setIsOpen(false);
    setIsExpanded(false);
    setIsMinimized(false);
    launcherRef.current?.focus();
  };

  const toggleMinimize = () => {
    if (isMinimized) {
      setIsMinimized(false);
      return;
    }

    setIsExpanded(false);
    setIsMinimized(true);
  };

  const toggleExpand = () => {
    setIsMinimized(false);
    setIsExpanded((current) => !current);
  };

  const toggleChat = () => {
    if (isOpen) {
      closeChat();
    } else {
      setIsOpen(true);
    }
  };

  const requestReply = async (history) => {
    const sequence = requestSequence.current + 1;
    requestSequence.current = sequence;

    const controller = new AbortController();
    requestRef.current = controller;
    setStatus('sending');
    setError('');
    inputRef.current?.focus({ preventScroll: true });

    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const reply = await sendChatMessage(
        history.slice(-MAX_HISTORY).map(({ role, content }) => ({ role, content })),
        { signal: controller.signal }
      );

      if (sequence !== requestSequence.current) return;

      setMessages((current) => [
        ...current,
        { id: nextMessageId(), role: 'assistant', content: reply },
      ]);
      setStatus('idle');
    } catch (requestError) {
      if (sequence !== requestSequence.current) return;

      setStatus('error');
      setError(requestError?.message || 'Assistant reply nahi kar paya. Phir try karein.');
    } finally {
      window.clearTimeout(timeout);
      if (requestRef.current === controller) requestRef.current = null;
    }
  };

  const sendText = (rawText) => {
    const text = rawText.trim();
    if (!text || status === 'sending') return;

    const userMessage = { id: nextMessageId(), role: 'user', content: text };
    const history = [...messages, userMessage];

    setMessages(history);
    setInput('');
    void requestReply(history);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendText(input);
  };

  const retryLast = () => {
    if (status === 'sending') return;
    void requestReply(messages);
  };

  const resetChat = () => {
    requestSequence.current += 1;
    requestRef.current?.abort();
    requestRef.current = null;

    setMessages([WELCOME_MESSAGE]);
    setInput('');
    setError('');
    setStatus('idle');
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (event) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    sendText(input);
  };

  const handlePanelKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeChat();
      return;
    }

    if (event.key !== 'Tab' || !panelRef.current) return;

    const focusable = Array.from(
      panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.getClientRects().length > 0);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const isSending = status === 'sending';

  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            id="chatbot-panel"
            ref={panelRef}
            className={`${styles.panel} ${isExpanded ? styles.panelExpanded : ''} ${
              isMinimized ? styles.panelMinimized : ''
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
            onKeyDown={handlePanelKeyDown}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className={styles.header}>
              <span className={styles.avatar} aria-hidden="true">
                <img
                  src="/images/chatbot-robot.png"
                  alt="Chatbot Robot"
                  className={styles.avatarImage}
                />
              </span>

              <div className={styles.heading}>
                <p className={styles.kicker}>Website assistant</p>
                <h2 id="chatbot-title">Vishwas Assistant</h2>
                <p className={styles.status}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  Online &middot; Website sawaal, Hinglish jawab
                </p>
              </div>

              <div className={styles.headerActions}>
                {messages.length > 1 && !isMinimized && (
                  <button
                    key="reset"
                    type="button"
                    className={styles.iconButton}
                    onClick={resetChat}
                    aria-label="Start a new chat"
                    title="Start a new chat"
                  >
                    <Icon name="reset" />
                  </button>
                )}

                <button
                  key="minimize"
                  type="button"
                  className={styles.iconButton}
                  onClick={toggleMinimize}
                  aria-label={isMinimized ? 'Restore chat' : 'Minimize chat'}
                  title={isMinimized ? 'Restore chat' : 'Minimize chat'}
                >
                  <Icon name={isMinimized ? 'expand' : 'minimize'} />
                </button>

                {!isMinimized && (
                  <button
                    key="maximize"
                    type="button"
                    className={`${styles.iconButton} ${styles.maximizeButton}`}
                    onClick={toggleExpand}
                    aria-label={isExpanded ? 'Restore chat size' : 'Maximize chat'}
                    title={isExpanded ? 'Restore chat size' : 'Maximize chat'}
                  >
                    <Icon name={isExpanded ? 'compress' : 'expand'} />
                  </button>
                )}

                <button
                  key="close"
                  type="button"
                  className={styles.iconButton}
                  onClick={closeChat}
                  aria-label="Close chat assistant"
                  title="Close chat"
                >
                  <Icon name="close" />
                </button>
              </div>
            </header>

            <div
              className={styles.log}
              ref={logRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              aria-label="Chat conversation"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.messageRow} ${
                    message.role === 'user' ? styles.userRow : styles.botRow
                  }`}
                >
                  {message.role === 'assistant' && (
                    <span className={styles.miniAvatar} aria-hidden="true">
                      <img
                        src="/images/chatbot-robot.png"
                        alt="Chatbot Robot"
                        className={styles.miniAvatarImage}
                      />
                    </span>
                  )}
                  <div
                    className={message.role === 'user' ? styles.userBubble : styles.botBubble}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}

              {isSending && (
                <div className={`${styles.messageRow} ${styles.botRow}`}>
                  <span className={styles.miniAvatar} aria-hidden="true">
                    <img
                      src="/images/chatbot-robot.png"
                      alt="Chatbot Robot"
                      className={styles.miniAvatarImage}
                    />
                  </span>
                  <div className={styles.typing} role="status">
                    <span className={styles.srOnly}>Assistant jawab likh raha hai</span>
                    <span className={styles.typingDots} aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className={styles.errorBox} role="alert">
                  <div className={styles.errorText}>
                    <Icon name="warning" />
                    <p>{error}</p>
                  </div>
                  <button type="button" className={styles.retry} onClick={retryLast}>
                    Phir try karein
                  </button>
                </div>
              )}

              {messages.length === 1 && status === 'idle' && (
                <div className={styles.prompts} role="group" aria-label="Suggested questions">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className={styles.prompt}
                      onClick={() => sendText(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div className={styles.logEnd} />
            </div>

            <div className={styles.helpBar}>
              <span className={styles.helpLabel}>Kisi se baat karni hai?</span>
              <a href={primaryPhone.href}>
                <Icon name="phone" />
                {primaryPhone.display}
              </a>
              <a href={whatsapp.url} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" />
                WhatsApp
              </a>
            </div>

            <form className={styles.composer} onSubmit={handleSubmit}>
              <label className={styles.srOnly} htmlFor="chatbot-input">
                Apna sawaal likhein
              </label>
              <textarea
                id="chatbot-input"
                ref={inputRef}
                className={styles.input}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Products, timings ya location poochhein..."
                rows={1}
                maxLength={MAX_INPUT_LENGTH}
                enterKeyHint="send"
              />
              <button
                type="submit"
                className={styles.send}
                disabled={!input.trim() || isSending}
                aria-label="Send message"
              >
                <Icon name={isSending ? 'spinner' : 'send'} className={isSending ? styles.spin : ''} />
              </button>
            </form>

            <p className={styles.disclaimer}>
              AI assistant &mdash; price, stock aur timings shop se confirm karein.
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        onClick={toggleChat}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {isOpen ? (
          <Icon name="close" />
        ) : (
          <img
            src="/images/chatbot-robot.png"
            alt="Chatbot Robot"
            className={styles.launcherImage}
          />
        )}
        {!isOpen && <span className={styles.launcherLabel}>Chat karein</span>}
        {!isOpen && <span className={styles.onlineDot} aria-hidden="true" />}
      </button>
    </>
  );
}
