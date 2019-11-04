#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <pthread.h>

// ####################################
// function declarations
void a();
void b();
void c();
void timeout();
void async();

void *setTimeout(void *arg);
void *simulateAsync(void *arg);

pthread_t tid;
pthread_t tid2;
void createTimeoutThread();
void createAsyncThread();

void initGlobals();
// ####################################

// ####################################
// stacks and indices
void (*callStack[4])();
int callIndex;

void (*messageQueue[3])();
int msgIndex;

void (*jobQueue[3])();
int jobIndex;
// ####################################

int main() {
    // a();
    // sleep(0);
    // timeout();
    // c();

    initGlobals();

    // simulate the event loop
    while (1) {
        // pop a call off of the stack and execute it
        if (callIndex >= 0) {
            printf("\nloop: pop call stack\n");
            callStack[callIndex--]();

        // only if there are no calls on the stack, execute calls on the job and msg queues
        } else if (callIndex < 0 && jobIndex >= 0) {
            printf("\nloop: dequeue job queue\n");
            jobQueue[jobIndex--]();
        
        } else if (callIndex < 0 && msgIndex >= 0) {
            printf("\nloop: dequeue message queue\n");
            messageQueue[msgIndex--]();

        // else there are no calls, no jobs, and no messages
        }
        sleep(1);
    }
}

// ####################################
// implementing primitive and helper functions

void a() {
    printf("Aa\n");
};

void c() {
    printf("Cc\n");
};

void timeout() {
    printf("execute timeout callback\n");
}

void async() {
    printf("execute async data call\n");
};

void initGlobals() {
    msgIndex = -1;
    jobIndex = -1;

    // callIndex = 2;
    // callStack[0] = c;
    // callStack[1] = createTimeoutThread;
    // callStack[2] = a;

    callIndex = 3;
    callStack[0] = createAsyncThread; // Promise()
    callStack[1] = c;
    callStack[2] = createTimeoutThread; // setTimeout(callback, 0)
    callStack[3] = a;
}

// ####################################

// ####################################
// implementing non-blocking calls with threads

void createTimeoutThread() {
    pthread_create(&tid, NULL, setTimeout, NULL);
}

void *setTimeout(void *arg) {
    sleep(0);
    printf("pushing timeout callback onto message queue\n");
    messageQueue[++msgIndex] = timeout;
}

void createAsyncThread() {
    pthread_create(&tid2, NULL, simulateAsync, NULL);
}

void *simulateAsync(void *arg) {
    printf("pushing async data call onto job queue\n");
    jobQueue[++jobIndex] = async;
}

// ####################################