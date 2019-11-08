all: .\eventloop\eventloop.c .\node\thread.c	
	gcc -o eventloop .\eventloop\eventloop.c
	gcc -o thread .\node\thread.c

clean:	
	rm eventloop.exe thread.exe