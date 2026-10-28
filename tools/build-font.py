"""Build the original Aarya Tall uppercase display prototype with Python's standard library.
No imported font outlines. Output is deterministic TrueType; not a general text face.
"""
from pathlib import Path
import math
import struct

ROOT = Path(__file__).resolve().parents[1]
GLYPHS = {}

def polygon(points):
    points = [(round(x), round(y)) for x, y in points]
    area = sum(x * points[(i+1)%len(points)][1] - points[(i+1)%len(points)][0] * y for i,(x,y) in enumerate(points))
    return points if area < 0 else points[::-1]

def stroke(points, width=132):
    contours=[]
    for (x1,y1),(x2,y2) in zip(points,points[1:]):
        length=math.hypot(x2-x1,y2-y1)
        dx=-(y2-y1)/length*width/2;dy=(x2-x1)/length*width/2
        contours.append(polygon([(x1+dx,y1+dy),(x2+dx,y2+dy),(x2-dx,y2-dy),(x1-dx,y1-dy)]))
    return contours

def letter(name, *paths, width=480):
    GLYPHS[name]=(width, [p for path in paths for p in stroke(path)])

L=100;R=380;B=75;T=825;M=450
oval=[(240,825),(340,790),(380,700),(380,200),(340,110),(240,75),(140,110),(100,200),(100,700),(140,790),(240,825)]
letter('A',[(80,0),(240,900),(400,0)],[(135,330),(345,330)])
letter('B',[(L,B),(L,T),(280,T),(R,730),(R,550),(285,M),(L,M)],[(285,M),(R,350),(R,170),(280,B),(L,B)])
letter('C',[(R,730),(340,790),(240,T),(140,790),(L,700),(L,200),(140,110),(240,B),(340,110),(R,170)])
letter('D',[(L,B),(L,T),(240,T),(340,770),(R,650),(R,250),(340,130),(240,B),(L,B)])
letter('E',[(R,T),(L,T),(L,B),(R,B)],[(L,M),(330,M)])
letter('F',[(L,0),(L,T),(R,T)],[(L,M),(330,M)])
letter('G',[(R,730),(340,790),(240,T),(140,790),(L,700),(L,200),(140,110),(240,B),(340,110),(R,200),(R,430),(260,430)])
letter('H',[(L,0),(L,900)],[(R,0),(R,900)],[(L,M),(R,M)])
letter('I',[(110,0),(110,900)],width=220)
letter('J',[(R,900),(R,220),(340,110),(240,B),(140,110),(L,220)])
letter('K',[(L,0),(L,900)],[(400,900),(L,420),(400,0)])
letter('L',[(L,900),(L,B),(R,B)])
letter('M',[(L,0),(L,900),(280,450),(460,900),(460,0)],width=560)
letter('N',[(L,0),(L,900),(R,0),(R,900)])
letter('O',oval)
letter('P',[(L,0),(L,T),(280,T),(R,730),(R,550),(280,M),(L,M)])
letter('Q',oval,[(260,240),(420,-30)])
letter('R',[(L,0),(L,T),(280,T),(R,730),(R,550),(280,M),(L,M)],[(260,M),(420,0)])
letter('S',[(R,730),(340,790),(240,T),(140,790),(L,690),(L,590),(150,510),(330,390),(R,300),(R,200),(340,110),(240,B),(140,110),(L,180)])
letter('T',[(30,T),(450,T)],[(240,T),(240,0)])
letter('U',[(L,900),(L,220),(140,110),(240,B),(340,110),(R,220),(R,900)])
letter('V',[(80,900),(240,0),(400,900)])
letter('W',[(80,900),(170,0),(310,600),(450,0),(540,900)],width=620)
letter('X',[(80,900),(400,0)],[(400,900),(80,0)])
letter('Y',[(80,900),(240,470),(400,900)],[(240,470),(240,0)])
letter('Z',[(60,T),(420,T),(60,B),(420,B)])
letter('0',oval)
letter('1',[(80,700),(240,T),(240,B)],[(90,B),(390,B)])
letter('2',[(L,720),(140,790),(240,T),(340,790),(R,700),(R,590),(L,B),(R,B)])
letter('3',[(L,750),(180,T),(300,T),(R,730),(R,550),(270,M),(170,M)],[(270,M),(R,350),(R,170),(300,B),(180,B),(L,160)])
letter('4',[(R,0),(R,900),(80,300),(440,300)])
letter('5',[(R,T),(L,T),(L,480),(280,480),(R,370),(R,180),(300,B),(180,B),(L,150)])
letter('6',[(R,750),(300,T),(180,T),(L,710),(L,200),(180,B),(300,B),(R,200),(R,370),(300,480),(L,480)])
letter('7',[(60,T),(420,T),(170,0)])
letter('8',[(240,M),(140,520),(L,700),(160,T),(320,T),(R,700),(340,520),(240,M),(140,380),(L,200),(160,B),(320,B),(R,200),(340,380),(240,M)])
letter('9',[(L,150),(180,B),(300,B),(R,190),(R,700),(300,T),(180,T),(L,700),(L,530),(180,420),(R,420)])
letter('-',[(100,M),(380,M)])
letter('.',[(110,0),(110,120)],width=220)
letter('/',[(80,0),(400,900)])
letter('+',[(80,M),(400,M)],[(240,240),(240,660)])
letter('&',[(400,0),(100,600),(100,730),(180,T),(280,T),(350,730),(350,620),(100,300),(100,180),(180,B),(280,B),(400,260)])
letter("'",[(110,900),(110,730)],width=220)
letter('!',[(110,900),(110,270)],[(110,120),(110,0)],width=220)
GLYPHS[' ']=(220,[])

pack=lambda fmt,*args:struct.pack('>'+fmt,*args)
def checksum(data):
    data+=b'\0'*((-len(data))%4)
    return sum(struct.unpack('>'+str(len(data)//4)+'I',data))&0xffffffff

order=['.notdef']+list(GLYPHS)
GLYPHS['.notdef']=(480,stroke([(100,75),(380,75),(380,825),(100,825),(100,75)]))
glyf=b'';offsets=[];metrics=b'';max_points=0;max_contours=0
for char in order:
    offsets.append(len(glyf));advance,contours=GLYPHS[char]
    points=[p for contour in contours for p in contour]
    if not points:
        data=pack('hhhhh',0,0,0,0,0)
        xmin=0
    else:
        xs,ys=zip(*points);xmin=min(xs)
        data=pack('hhhhh',len(contours),xmin,min(ys),max(xs),max(ys))
        end=-1
        for contour in contours:
            end+=len(contour);data+=pack('H',end)
        data+=pack('H',0)+bytes([1]*len(points))
        for axis in [0,1]:
            previous=0
            for point in points:
                data+=pack('h',point[axis]-previous);previous=point[axis]
    glyf+=data+b'\0'*((-len(data))%4)
    metrics+=pack('Hh',advance,xmin)
    max_points=max(max_points,len(points));max_contours=max(max_contours,len(contours))
offsets.append(len(glyf))
cmap={ord(c):order.index(c) for c in GLYPHS if len(c)==1}
# Lowercase maps to uppercase for this deliberately caps-only display face.
cmap.update({ord(c.lower()):order.index(c) for c in GLYPHS if len(c)==1 and c.isupper()})
codes=sorted(cmap)+[65535];seg=len(codes);power=2**int(math.log2(seg))
sub=pack('7H',4,16+seg*8,0,seg*2,power*2,int(math.log2(power)),seg*2-power*2)
sub+=b''.join(pack('H',c) for c in codes)+pack('H',0)+b''.join(pack('H',c) for c in codes)
sub+=b''.join(pack('H',((cmap.get(c,0)-c)&65535)) for c in codes)+b'\0'*(seg*2)
name_strings={0:'Copyright 2026 Aarya Avinash portfolio project. Original prototype lettering.',1:'Aarya Tall',2:'Regular',3:'AaryaTall-Regular-0.1',4:'Aarya Tall Regular',5:'Version 0.100',6:'AaryaTall-Regular',13:'MIT License. See FONT-LICENSE.txt.'}
name_records=b'';string_data=b''
for name_id,value in name_strings.items():
    value=value.encode('utf-16-be');name_records+=pack('6H',3,1,0x409,name_id,len(value),len(string_data));string_data+=value
head=pack('IIIIHHqqhhhhHHhhh',0x10000,0x10000,0,0x5f0f3cf5,3,1000,0,0,-80,-120,700,980,0,8,2,1,0)
hhea=pack('IhhhHhhhhhhhhhhhH',0x10000,980,-160,0,620,-80,-80,700,1,0,0,0,0,0,0,0,len(order))
maxp=pack('I14H',0x10000,len(order),max_points,max_contours,0,0,2,0,0,0,0,0,0,0,0)
os2=pack('HhHHH',0,480,400,3,0)+pack('11h',650,600,0,75,650,600,0,350,50,450,0)+bytes([2,11,8,6,2,2,2,2,2,4])+pack('4I',1,0,0,0)+b'AARY'+pack('HHHhhhHH',64,32,122,980,-160,0,980,160)
tables={'cmap':pack('HHHHI',0,1,3,1,12)+sub,'glyf':glyf,'head':head,'hhea':hhea,'hmtx':metrics,'loca':b''.join(pack('I',n) for n in offsets),'maxp':maxp,'name':pack('HHH',0,len(name_strings),6+len(name_strings)*12)+name_records+string_data,'OS/2':os2,'post':pack('IIhhIIIII',0x30000,0,-100,50,0,0,0,0,0)}
count=len(tables);power=2**int(math.log2(count));header=pack('IHHHH',0x10000,count,power*16,int(math.log2(power)),count*16-power*16)
offset=12+16*count;directory=b'';payload=b'';head_offset=0
for tag,data in sorted(tables.items()):
    if tag=='head':head_offset=offset
    directory+=tag.encode()+pack('III',checksum(data),offset,len(data))
    padded=data+b'\0'*((-len(data))%4);payload+=padded;offset+=len(padded)
font=bytearray(header+directory+payload)
struct.pack_into('>I',font,head_offset+8,(0xb1b0afba-checksum(bytes(font)))&0xffffffff)
output=ROOT/'public/fonts/aarya-tall.ttf';output.write_bytes(font)
assert checksum(bytes(font)) == 0xb1b0afba
assert len(set(order)) == len(order) and all(ord(c) in cmap for c in 'AARYA AVINASH0123456789')
print(f'Generated {output.name}: {len(order)} glyphs, {len(font)} bytes; checksum and name coverage passed.')
