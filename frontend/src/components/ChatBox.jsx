import React, { useState, useEffect, useRef } from "react";

const contacts = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "David Miller" },
  { id: 5, name: "Eve Williams" },
  { id: 6, name: "Frank Thompson" },
  { id: 7, name: "Grace Hopper" },
  { id: 8, name: "Hannah White" },
  { id: 9, name: "Ivy Green" },
  { id: 10, name: "Jack Black" },
  { id: 11, name: "Kevin Brown" },
  { id: 12, name: "Lily Adams" },
  { id: 13, name: "Michael Scott" },
];

const ChatBox = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const chatEndRef = useRef(null);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages[selectedContact?.id]]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    if (!messages[contact.id]) {
      setMessages((prev) => ({
        ...prev,
        [contact.id]: [{ text: `Hello, ${contact.name}!`, sender: "bot" }],
      }));
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const updatedMessages = {
        ...messages,
        [selectedContact.id]: [
          ...(messages[selectedContact.id] || []),
          { text: newMessage, sender: "user" },
        ],
      };
      setMessages(updatedMessages);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-900 text-gray-300">
      {/* Sidebar Contact List */}
      <div className="w-full lg:w-1/3 bg-gray-800 border-r border-gray-700">
        <h2 className="p-4 text-xl font-bold">Contacts</h2>

        {/* Search Bar */}
        <div className="p-4">
          <input
            type="text"
            className="w-full bg-gray-700 text-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Scrollable Contact List */}
        <ul className="space-y-2 overflow-y-auto h-[calc(100vh-12rem)]">
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              onClick={() => handleSelectContact(contact)}
              className={`p-4 cursor-pointer transition-colors ${
                selectedContact?.id === contact.id
                  ? "bg-blue-700"
                  : "hover:bg-gray-700"
              }`}
            >
              {contact.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Box */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col bg-gray-800">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
            <h3 className="text-lg font-bold">{selectedContact.name}</h3>
            <button
              onClick={() => setSelectedContact(null)}
              className="text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {(messages[selectedContact.id] || []).map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-gray-900 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                className="flex-1 bg-gray-700 text-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a contact to start chatting
        </div>
      )}
    </div>
  );
};

export default ChatBox;