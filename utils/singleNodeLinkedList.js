// Node class for Linked List
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// Linked List class
export class SingleLinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  // Add to the end
  append(data) {
    const newNode = new Node(data)
    if (!this.head) {
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    this.length++
  }

  // Remove from the front (FIFO - useful for queues)
  removeHead() {
    if (!this.head) return null
    const removed = this.head
    this.head = this.head.next
    this.length--
    return removed.data
  }

  // Get all values as array (for rendering)
  toArray() {
    const result = []
    let current = this.head
    while (current) {
      result.push(current.data)
      current = current.next
    }
    return result
  }

  // Peek at the front element
  peek() {
    return this.head ? this.head.data : null
  }

  // Check if empty
  isEmpty() {
    if(this.length === 0) return true
  }

  // Clear all nodes
  clear() {
    this.head = null
    this.length = 0
  }
}
