export class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }
// adding to the list 
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = this.tail = this.current = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

// remove based on an id 
  removeById(id) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data.id === id) {
        if (currentNode.prev) currentNode.prev.next = currentNode.next;
        if (currentNode.next) currentNode.next.prev = currentNode.prev;
        if (currentNode === this.head) this.head = currentNode.next;
        if (currentNode === this.tail) this.tail = currentNode.prev;
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }
  // find an element
  find(searchTerm) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data.route.includes(searchTerm) || currentNode.data.id === searchTerm) {
        return currentNode.data;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
  //find next trip
  findNext(){
    const currentNode = this.current;
    
    currentNode = currentNode.prev
    return currentNode.data
  }
  

// remove the last
  removeLast() {
    if (!this.tail) return false;
    const lastTrip = this.tail;
    if (lastTrip.prev) lastTrip.prev.next = null;
    this.tail = lastTrip.prev;
    return lastTrip.data;
  }

  toArray() {
    const result = [];
    let currentNode = this.head;
    while (currentNode) {
      result.push(currentNode.data);
      currentNode = currentNode.next;
    }
    return result;
  }

  // Update a trip's status based on its id
  updateTripStatus(id, status) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data.id === id) {
        currentNode.data.status = status;
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }
  // Clear all nodes
  clearAll() {

    this.head = null;
    this.data = null;
    this.tail = null;
    this.toArray(null)
  }
  // peek 
  peek() {
    return this.head ? this.head.data : null
  }
}
